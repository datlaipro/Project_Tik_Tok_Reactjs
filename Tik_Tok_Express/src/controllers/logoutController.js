const jwt = require('jsonwebtoken');
const configDB = require('../config/database');
const path = require('path');

// Chỉ load .env khi chạy DEV (local). Prod dùng env từ Docker Compose.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
}
const SECRET_KEY = process.env.JWT_SECRET;

async function logOutAccount(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;   // chuỗi JWT
    if (refreshToken) {
      const payload = jwt.verify(refreshToken, SECRET_KEY);// xác thực token xem có hợp lệ không
      // Nếu token hợp lệ, xoá refresh token trong CSDL
      // Thu hồi token trong DB
      await configDB.query(
        'UPDATE users SET refresh_token = NULL WHERE user_id = ?',
        [payload.user_id]
      );
    }

    // Xoá cookies (path phải khớp lúc set)
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: false, path: '/' });
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax', secure: false, path: '/api/refresh' });

    return res.status(200).json({
      success: true,
      message: 'Đã đăng xuất'
    });

  } catch (err) {
    console.error('Logout error:', err.message);
    return res.status(400).json({ success: false, message: 'Refresh token không hợp lệ' });
  }
}

module.exports = { logOutAccount };
