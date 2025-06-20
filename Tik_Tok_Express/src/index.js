const express = require('express')
const path = require('path') // thư viện path để xử lý đường dẫn
const morgan = require('morgan')//thư viện morgan để log request http từ phía client
const handlebar = require('express-handlebars')//thư viện express-handlebars để render html view về frontend
const app = express()
const configDB = require('./config/database'); // chỉnh đúng đường dẫn đến file database.js
const port = process.env.PORT || 8888 // lấy port từ biến môi trường hoặc mặc định là 8888
require('dotenv').config()// thư viện dotenv để đọc biến môi trường từ file .env

app.use(morgan('combined')) // sử dụng morgan với định dạng 'dev' để log request
app.get('/', (req, res) => {// điều huong khi có request đến đường dẫn '/'
  res.render('home')

})
app.get('/search', (req, res) => {// điều huong khi có request đến đường dẫn '/'
  console.log('Search route hit!')
  res.render('search')
})
app.set('views', path.join(__dirname, 'resources\\views')) // thiết lập thư mục chứa view
app.engine('handlebars', handlebar.engine()); // đăng ký engine handlebars
app.set('view engine', 'handlebars'); // thiết lập view engine là handlebars



async function main() {
  const connection = await configDB();

  const [results, fields] = await connection.query('SELECT * FROM users');
  // console.log('data=', results);
  app.get('/api/users', (req, res) => {// api để lấy dữ liệu người dùng
    res.json(results);
  });
  app.listen(port, () => {

    console.log(`Server running at http://localhost:${port}`);
  });
}

main().catch(err => {
  console.error('Lỗi khi khởi chạy app:', err);
});
