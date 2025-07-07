const express = require('express');
const authMiddleware = require('../../middleware/verifyCookie'); // chỉnh đúng đường dẫn đến file verifyCookie.js
const creatAccountController= require('../../controllers/creatUserController'); // chỉnh đúng đường dẫn đến file creatUserController.js
const userLogin= require('../../controllers/loginUserController'); // chỉnh đúng đường dẫn đến file loginUserController.js
const router = express.Router();
const profileUser = require('../../controllers/profileController'); // chỉnh đúng đường dẫn đến file profileUserController.js

router.post('/createUser',creatAccountController.creatAccountController)// Đường dẫn API để tạo tài khoản
router.post('/login', userLogin.loginUserController); // Đường dẫn API để đăng nhập người dùng
router.get("/profile", authMiddleware,profileUser.profileController); // Đường dẫn API để lấy thông tin người dùng đã đăng nhập);
module.exports = router;

