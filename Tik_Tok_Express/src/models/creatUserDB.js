const configDB = require('../config/database'); // chỉnh đúng đường dẫn đến file database.js
const bcrypt = require('bcrypt');

async function creatUserDB(account, password) {


    try {

        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        password = await bcrypt.hash(password, 10);
        const [result] = await configDB.query(
            'INSERT INTO users (account, password) VALUES (?, ?)',
            [account, password]
        );
        return { success: true, userId: result.insertId };
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'Tài khoản đã tồn tại' };
        }
        throw err; // lỗi khác thì ném ra để debug
    }

}

module.exports = { creatUserDB };