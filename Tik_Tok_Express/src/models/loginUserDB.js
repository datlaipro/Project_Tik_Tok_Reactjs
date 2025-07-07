const configDB = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
async function loginUserDB(username, password) {// Hàm đăng nhập người dùng
    const connection = await configDB();

    try {
        const [rows] = await connection.query(
            'SELECT  account, password FROM users WHERE account = ?',
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
                { id: user.userId, account: user.account }, SECRET_KEY, { expiresIn: '1h' })


            // Nếu đúng, trả về thông tin người dùng
            return { success: true, userId: user.id, account: user.account, token: token };
        }


    } catch (err) {
        console.error("Lỗi truy vấn:", err);
        return { success: false, message: 'Lỗi hệ thống' };
    }
}
module.exports = { loginUserDB };// xuất hàm đăng nhập người dùng