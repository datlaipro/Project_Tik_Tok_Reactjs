const configDB = require('../config/database');
const bcrypt = require('bcrypt');

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
        }

        // Nếu đúng, trả về thông tin người dùng
        return { success: true, userId: user.id, account: user.account };

    } catch (err) {
        console.error("Lỗi truy vấn:", err);
        return { success: false, message: 'Lỗi hệ thống' };
    }
}
module.exports = { loginUserDB };// xuất hàm đăng nhập người dùng