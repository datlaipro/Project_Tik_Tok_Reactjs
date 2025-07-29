
const express = require('express')
require('dotenv').config()// thư viện dotenv để đọc biến môi trường từ file .env và phải được gọi trước khi sử dụng bất kỳ biến môi trường nào

const app = express()
const cookieParser = require("cookie-parser");// thư viện cookie-parser để xử lý cookie từ phía client

const path = require('path') // thư viện path để xử lý đường dẫn
const morgan = require('morgan')//thư viện morgan để log request http từ phía client


const cors = require('cors'); // 👈 import thư viện
app.use(
  cors({
    origin: "http://localhost:3000", // hoặc nơi bạn chạy React
    credentials: true,               // ❗ CHO PHÉP gửi cookie
  })
);app.use(express.json()); // 👈 đọc JSON từ body
const apiCreateAccount = require('./routes/AccountApi/API'); // chỉnh đúng đường dẫn đến file creatAccount.js
const apiLoginAccount = require('./routes/AccountApi/API'); // chỉnh đúng đường dẫn đến file loginAccount.js
const apiProfileUser = require('./routes/AccountApi/API') // chỉnh đúng đường dẫn đến file profileController.js
const apiLogoutUser = require('./routes/AccountApi/API'); // chỉnh đúng đường dẫn đến file logoutController.js
const upLoadVideo = require('./routes/AccountApi/API'); // chỉnh đúng đường dẫn đến file uploadVideoControler.js
const renderVideoController = require('./routes/AccountApi/API'); // chỉnh đúng đường dẫn đến file renderVideoController.js
const authRoutes=require('./routes/AccountApi/API');
const emotionalUpdates= require('./routes/AccountApi/API');//  chỉnh đúng đường dẫn đến file update like
const renderComments=require('./routes/AccountApi/API');
const port = process.env.PORT
app.use(cookieParser());

require('dotenv').config()// thư viện dotenv để đọc biến môi trường từ file .env
// const router = require('./routes/Account/creatAccount'); // chỉnh đúng đường dẫn đến file creatAccount.js
app.use(morgan('combined')) // sử dụng morgan với định dạng 'dev' để log request

app.use('/api', apiCreateAccount); // sử dụng router cho các API liên quan đến đăng kí  tài khoản
app.use('/api', apiLoginAccount)// sử dụng router cho các API liên quan đến đăng nhập tài khoản
app.use('/api', apiProfileUser)// sử dụng router cho các API liên quan đến lấy thông tin người dùng đã đăng nhập
app.use('/api', apiLogoutUser)// sử dụng router cho các API liên quan đến đăng xuất tài khoản
app.use('/api', upLoadVideo)// sử dụng router cho các API liên quan đến upload video
app.use('/api', renderVideoController)// sử dụng router cho các API liên quan đến render video
app.use('/auth', authRoutes); // sử dụng router cho các API liên quan đến xác thực người dùng
app.use('/api', emotionalUpdates);// router cho cập nhật like 
app.use('/api',renderComments)// api lấy comment
app.listen(port, () => {

  console.log(`Server running at http://localhost:${port}`);
});



