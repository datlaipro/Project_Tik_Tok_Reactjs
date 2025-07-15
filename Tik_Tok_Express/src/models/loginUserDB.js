const configDB = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const REFRESH_EXPIRE = '7d';// Thời gian hết hạn của token refresh

const SECRET_KEY = process.env.JWT_SECRET;
async function loginUserDB(username, password) {// Hàm đăng nhập người dùng

    try {
        const [rows] = await configDB.query(
            'SELECT user_id, account, password FROM users WHERE account = ?',
            [username]
        );

        if (rows.length === 0) {//nếu không tìm thấy tài khoản
            return { success: false, message: 'Tài khoản không tồn tại' };
        }

        const user = rows[0];// nếu thấy tài khoản thì lấy thông tin người dùng

        // So sánh mật khẩu nhập vào với mật khẩu đã mã hoá trong DB
        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return { success: false, message: 'Mật khẩu không đúng' };
        } else {
            // Tạo token JWT nếu mật khẩu đúng
            const token = jwt.sign(
                { user_id: user.user_id, account: user.account }, SECRET_KEY, { expiresIn: '5m' })

            const refreshToken = jwt.sign(// Tạo token refresh
                { user_id: user.user_id, account: user.account },
                SECRET_KEY,
                { expiresIn: REFRESH_EXPIRE }
            );
            const hashedRT = await bcrypt.hash(refreshToken, 10);
            // Mã hoá refresh token trước khi lưu vào DB
            await configDB.query(
                'UPDATE users SET refresh_token = ? WHERE user_id = ?',
                [hashedRT, user.user_id]
            );

            // Nếu đúng, trả về thông tin người dùng
            return { success: true, userId: user.user_id, account: user.account, token: token, refreshToken: refreshToken, message: 'Đăng nhập thành công' };
        }


    } catch (err) {
        console.error("Lỗi truy vấn:", err);
        return { success: false, message: 'Lỗi hệ thống' };
    }
}
module.exports = { loginUserDB };// xuất hàm đăng nhập người dùng