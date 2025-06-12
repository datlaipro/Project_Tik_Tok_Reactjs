const express = require('express')
const path = require('path') // thư viện path để xử lý đường dẫn
const morgan = require('morgan')//thư viện morgan để log request http từ phía client
const handlebar=require('express-handlebars')//thư viện express-handlebars để render html view về frontend
const app = express()
const port = 8080

app.use(morgan('combined')) // sử dụng morgan với định dạng 'dev' để log request
app.get('/', (req, res) => {// điều huong khi có request đến đường dẫn '/'
  res.render('home')
})
app.get('/search', (req, res) => {// điều huong khi có request đến đường dẫn '/'
  console.log('Search route hit!')
  res.render('search')
})
app.set ('views', path.join(__dirname, 'resources\\views')) // thiết lập thư mục chứa view
app.engine('handlebars', handlebar.engine()); // đăng ký engine handlebars
app.set('view engine', 'handlebars'); // thiết lập view engine là handlebars
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
