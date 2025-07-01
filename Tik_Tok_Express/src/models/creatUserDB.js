const configDB = require('../config/database'); // chỉnh đúng đường dẫn đến file database.js
async function creatUserDB(account, password) {

    const connection = await configDB();

    try {
        const [result] = await connection.query(
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