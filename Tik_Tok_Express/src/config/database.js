const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,   // tuỳ bài toán & cấu hình server
  queueLimit: 0
});

module.exports = pool;     // KHÔNG export hàm tạo mới, mà export chính pool
