const configDB = require('../config/database'); // chỉnh đúng đường dẫn đến file database.js
async function creatUserDB(account, password) {

    const connection = await configDB();

    const [result, fields] = await connection.query('INSERT INTO users (account, password) VALUES (?, ?)',
        [account, password]);
    return { success: true, userId: result.insertId };
}

module.exports = { creatUserDB };