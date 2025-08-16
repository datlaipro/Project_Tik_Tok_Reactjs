const loginUserDB = require('../models/loginUserDB');
const path = require('path');

// Chỉ load .env khi chạy DEV (local). Prod dùng env từ Docker Compose.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
}
async function loginUserController(req, res) {
    const { account, password } = req.body;

    try {
        const result = await loginUserDB.loginUserDB(account, password);
        if (result.success === true) {

            res.cookie("token", result.token, {
                httpOnly: true,
                secure: true,       // Bật true khi dùng HTTPS
                sameSite: "none",
                maxAge: 5 * 60 * 1000, // 5 phút
                // domain: process.env.DOMAIN

            });
            res.cookie("refreshToken", result.refreshToken, {// Lưu refresh token vào cookie
                httpOnly: true,
                secure: true,       // Bật true khi dùng HTTPS
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
                path: '/api/refresh', // 👈 Cookie chỉ được gửi khi truy cập /refresh
                // domain: process.env.DOMAIN

            });

            return res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công',
                userId: result.userId,
                name: account, // Trả về tên tài khoản đã đăng nhập
                // token: result.token, // Trả về token JWT
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: result.message,
            });
        }
    } catch (e) {
        throw e; // Ném lỗi để xử lý ở nơi khác
    }
}
module.exports = { loginUserController }; // Xuất hàm đăng nhập người dùng