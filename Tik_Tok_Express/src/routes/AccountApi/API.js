const express = require('express');
const authMiddleware = require('../../middleware/verifyCookie'); // chỉnh đúng đường dẫn đến file verifyCookie.js
const creatAccountController= require('../../controllers/creatUserController'); // chỉnh đúng đường dẫn đến file creatUserController.js
const userLogin= require('../../controllers/loginUserController'); // chỉnh đúng đường dẫn đến file loginUserController.js
const router = express.Router();
const upload= require('../../middleware/upLoadVideo'); // chỉnh đúng đường dẫn đến file upLoadVideo.js
const profileUser = require('../../controllers/profileController'); // chỉnh đúng đường dẫn đến file profileUserController.js
const logoutController = require('../../controllers/logoutController'); // chỉnh đúng đường dẫn đến file logoutController.js
const upLoadVideo = require('../../controllers/uploadVideoControler'); // chỉnh đúng đường dẫn đến file uploadVideoControler.js
router.post('/createUser',creatAccountController.creatAccountController)// Đường dẫn API để tạo tài khoản
router.post('/login', userLogin.loginUserController); // Đường dẫn API để đăng nhập người dùng
router.get("/profile", authMiddleware,profileUser.profileController); // Đường dẫn API để lấy thông tin người dùng đã đăng nhập);
router.post('/logout', authMiddleware, logoutController.logOutAccount); // Đường dẫn API để đăng xuất người dùng
router.post('/upload', authMiddleware, upload.single('video'), upLoadVideo); // Đường dẫn API để upload video
module.exports = router;

