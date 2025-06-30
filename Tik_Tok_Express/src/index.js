const express = require('express')
const path = require('path') // thư viện path để xử lý đường dẫn
const morgan = require('morgan')//thư viện morgan để log request http từ phía client
const handlebar = require('express-handlebars')//thư viện express-handlebars để render html view về frontend
const app = express()
const cors = require('cors'); // 👈 import thư viện
app.use(cors()); // 👈 cho phép tất cả frontend truy cập (mặc định)
app.use(express.json()); // 👈 đọc JSON từ body
const apiCreateAccount = require('./routes/Account/creatAccount'); // chỉnh đúng đường dẫn đến file creatAccount.js

// const configDB = require('./config/database'); // chỉnh đúng đường dẫn đến file database.js
const port = process.env.PORT 
require('dotenv').config()// thư viện dotenv để đọc biến môi trường từ file .env
// const router = require('./routes/Account/creatAccount'); // chỉnh đúng đường dẫn đến file creatAccount.js
app.use(morgan('combined')) // sử dụng morgan với định dạng 'dev' để log request
// app.get('/', (req, res) => {// điều huong khi có request đến đường dẫn '/'
//   res.render('home')

// })
// app.get('/search', (req, res) => {// điều huong khi có request đến đường dẫn '/'
//   console.log('Search route hit!')
//   res.render('search')
// })
app.use('/api', apiCreateAccount); // sử dụng router cho các API liên quan đến tài khoản

app.set('views', path.join(__dirname, 'resources\\views')) // thiết lập thư mục chứa view
app.engine('handlebars', handlebar.engine()); // đăng ký engine handlebars
app.set('view engine', 'handlebars'); // thiết lập view engine là handlebars

// app.use("/create-account",router ); // sử dụng middleware để phục vụ tệp tĩnh từ thư mục create-account
app.listen(port, () => {

    console.log(`Server running at http://localhost:${port}`);
  });


// async function main() {
//   const connection = await configDB();

//   const [results, fields] = await connection.query('SELECT * FROM users');
//   // console.log('data=', results);
//   app.get('/api/users', (req, res) => {// api để lấy dữ liệu người dùng
//     res.json(results);
//   });
//   app.listen(port, () => {

//     console.log(`Server running at http://localhost:${port}`);
//   });
// }

// main().catch(err => {
//   console.error('Lỗi khi khởi chạy app:', err);
// });
