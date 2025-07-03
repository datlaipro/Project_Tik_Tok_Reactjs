const express = require('express');
const creatAccountController= require('../../controllers/creatUserController'); // chỉnh đúng đường dẫn đến file creatUserController.js
const userLogin= require('../../controllers/loginUserController'); // chỉnh đúng đường dẫn đến file loginUserController.js
const router = express.Router();


router.post('/createUser',creatAccountController.creatAccountController)// Đường dẫn API để tạo tài khoản
router.post('/login', userLogin.loginUserController); // Đường dẫn API để đăng nhập người dùng
module.exports = router;

