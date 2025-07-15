const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const configDB = require('../config/database'); // đừng quên import nếu chưa có
const SECRET_KEY = process.env.JWT_SECRET;
const REFRESH_EXPIRE = '7d';

async function refreshToken(req, res, next) {
    const rawRefreshToken = req.cookies.refreshToken;
    if (!rawRefreshToken) {
        return res.status(401).json({ message: 'Thiếu refresh token' });
    }

    try {
        const payload = jwt.verify(rawRefreshToken, SECRET_KEY);// giải mã token và so sánh với SECRET_KEY

        const [rows] = await configDB.query(
            'SELECT refresh_token FROM users WHERE user_id = ?',
            [payload.user_id]
        );

        if (!rows.length) {
            return res.status(403).json({ message: 'Refresh token đã bị thu hồi' });
        }

        const hashedRT = rows[0].refresh_token;
        const isMatch = await bcrypt.compare(rawRefreshToken, hashedRT);// so sánh refresh token với hash trong CSDL
        if (!isMatch) {
            return res.status(403).json({ message: 'Refresh token không khớp' });
        }

        // ==== Phát token mới ====
        const newAccessToken = jwt.sign(
            { user_id: payload.user_id, account: payload.account },
            SECRET_KEY,
            { expiresIn: '5m' }
        );

        const newRefreshToken = jwt.sign(// phát refresh token mới
            { user_id: payload.user_id, account: payload.account },
            SECRET_KEY,
            { expiresIn: REFRESH_EXPIRE }
        );

        const hashRT = await bcrypt.hash(newRefreshToken, 10);// băm refresh token mới
        await configDB.query(
            'UPDATE users SET refresh_token = ? WHERE user_id = ?',
            [hashRT, payload.user_id]
        );

        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: false, // bật true nếu dùng HTTPS
            sameSite: 'lax',
            maxAge: 5 * 60 * 1000 // 5 phút
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
            path: '/api/refresh' //  path
        });

        req.user = payload;
        return next();

    } catch (err) {
        console.error("Lỗi giải mã refresh token:", err.message);
        return res.status(403).json({ message: 'Refresh token không hợp lệ' });
    }
}

module.exports = refreshToken;
