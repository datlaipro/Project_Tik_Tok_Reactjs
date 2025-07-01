const express = require('express');
const creatAccountController= require('../../controllers/creatUserController'); // chỉnh đúng đường dẫn đến file creatUserController.js

const router = express.Router();


router.post('/createUser',creatAccountController.creatAccountController)// Đường dẫn API để tạo tài khoản

module.exports = router;

