const loginUserDB = require('../models/loginUserDB');
async function loginUserController(req, res) {
    const { account, password } = req.body;

    try {
        const result = await loginUserDB.loginUserDB(account, password);
        if (result.success === true) {

            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false,       // Bật true khi dùng HTTPS
                sameSite: "lax",
                maxAge: 60 * 60 * 1000,
            });

            return res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công',
                // userId: result.userId,
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