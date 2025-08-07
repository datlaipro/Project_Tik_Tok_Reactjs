
const express = require('express')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });//tìm file env ở thư mục gốc
const app = express()
const cookieParser = require("cookie-parser");// thư viện cookie-parser để xử lý cookie từ phía client

const morgan = require('morgan')//thư viện morgan để log request http từ phía client


const cors = require('cors'); // 👈 import thư viện
app.use(
  cors({
    origin: "http://localhost:3000", // hoặc nơi bạn chạy React
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
// redisClient.js
// const redis = require('redis');

// const redisClient = redis.createClient({
//   socket: {
//     host: process.env.REDIS_HOST ,
//     port: process.env.REDIS_PORT , // 
//   },
//   username:  process.env.REDIS_USERNAME, // mặc định của Redis Cloud
//   password: process.env.REDIS_PASSWORD, //
// });

// redisClient.connect();

// redisClient.on('connect', () => {
//   console.log('✅ Đã kết nối Redis Cloud!');
// });

// redisClient.on('error', (err) => {
//   console.error('❌ Redis error:', err);
// });




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



