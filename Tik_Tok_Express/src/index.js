
const express = require('express')
const path = require('path');
const app = express()
require('dotenv').config()
const cookieParser = require("cookie-parser");// thư viện cookie-parser để xử lý cookie từ phía client
console.log('CORS_ORIGIN =', process.env.CORS_ORIGIN); // phải in ra http://localhost:3000

const morgan = require('morgan')//thư viện morgan để log request http từ phía client

app.set('trust proxy', 1); // nếu đứng sau Nginx/HTTPS
const cors = require('cors'); // 👈 import thư viện
app.use(
  cors({
    origin: ['https://www.tiktok.io.vn'], // FE origin // hoặc nơi bạn chạy React
    credentials: true,               // ❗ CHO PHÉP gửi cookie
  })
);app.use(express.json()); // 👈 đọc JSON từ body
const likeVideo = require('./routes/AccountApi/API');
const apiCreateAccount = require('./routes/AccountApi/API'); // chỉnh đúng đường dẫn đến file creatAccount.js
const apiLoginAccount = require('./routes/AccountApi/API'); // chỉnh đúng đường dẫn đến file loginAccount.js
const apiProfileUser = require('./routes/AccountApi/API') // chỉnh đúng đường dẫn đến file profileController.js
const apiLogoutUser = require('./routes/AccountApi/API'); // chỉnh đúng đường dẫn đến file logoutController.js
const upLoadVideo = require('./routes/AccountApi/API'); // chỉnh đúng đường dẫn đến file uploadVideoControler.js
const renderVideoController = require('./routes/AccountApi/API'); // chỉnh đúng đường dẫn đến file renderVideoController.js
const authRoutes=require('./routes/AccountApi/API');
const emotionalUpdates= require('./routes/AccountApi/API');//  chỉnh đúng đường dẫn đến file update like
const renderComments=require('./routes/AccountApi/API');
const myvideo=require('./routes/AccountApi/API');
const addBookMark =require('./routes/AccountApi/API');

const videoBookmark = require('./routes/AccountApi/API'); // chỉnh đúng đường dẫn đến file renderVideoBookmark.js
const port = process.env.PORT
app.use(cookieParser());

// const router = require('./routes/Account/creatAccount'); // chỉnh đúng đường dẫn đến file creatAccount.js
app.use(morgan('combined')) // sử dụng morgan với định dạng 'dev' để log request


const pool = require('../src/config/database'); // import pool từ file database.js

app.get('/api/dbping', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ db: 'up' });
  } catch (e) {
    res.status(500).json({ db: 'down', error: e.message });
  }
});

// server.js (hoặc app.js)
const http = require('http');
const app = require('./app'); // express instance
const { ensureConnected } = require('./config/redisClient');// import cấu hình redis

(async () => {
  try {
    await ensureConnected();
    const server = http.createServer(app);
    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });

    // graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n👋 Shutting down...');
      try { await require('./src/config/redisClient').redisClient.quit(); } catch {}
      process.exit(0);
    });
  } catch (e) {
    console.error('❌ Failed to start server due to Redis:', e);
    process.exit(1);
  }
})();






app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api', addBookMark);
app.use('/api', videoBookmark);
app.use('/api', likeVideo);   // sử dụng router cho các API liên quan đến render video đã thích
app.use('/api', apiCreateAccount); // sử dụng router cho các API liên quan đến đăng kí  tài khoản
app.use('/api', apiLoginAccount)// sử dụng router cho các API liên quan đến đăng nhập tài khoản
app.use('/api', apiProfileUser)// sử dụng router cho các API liên quan đến lấy thông tin người dùng đã đăng nhập
app.use('/api', apiLogoutUser)// sử dụng router cho các API liên quan đến đăng xuất tài khoản
app.use('/api', upLoadVideo)// sử dụng router cho các API liên quan đến upload video
app.use('/api', renderVideoController)// sử dụng router cho các API liên quan đến render video
app.use('/auth', authRoutes); // sử dụng router cho các API liên quan đến xác thực người dùng
app.use('/api', emotionalUpdates);// router cho cập nhật like 
app.use('/api',renderComments)// api lấy comment
app.use('/api',myvideo)// api lấy video đã đăng của user
app.listen(port, () => {

  console.log(`Server running at http://localhost:${port}`);
});



