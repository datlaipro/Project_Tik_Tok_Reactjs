const mysql = require('mysql2/promise'); // dùng mysql2/promise mới có await// Create the connection to database
require('dotenv').config(); // Thư viện dotenv để đọc biến môi trường từ file .env
async function configDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Lấy host từ biến môi trường hoặc mặc định là localhost
    user: process.env.DB_USER,
    database: process.env.DB_NAME, // Tên cơ sở dữ liệu của bạn
    password: process.env.DB_PASSWORD,  // Mật khẩu của bạn
  });
  return connection;
}

module.exports = configDB;