const express = require('express');
const creatAccountController= require('../../controllers/creatUserController'); // chỉnh đúng đường dẫn đến file creatUserController.js
// const configDB = require('./config/database'); // chỉnh đúng đường dẫn đến file database.js
// const data = require('../../models/creatUserDB'); // chỉnh đúng đường dẫn đến file creatUser.js
const router = express.Router();
// async function getUserModel(req,res) {
//     try {
//         const users = await data.creatUser();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: 'Lỗi truy vấn CSDL' });
//     }
// }

router.post('/createUser',creatAccountController.creatAccountController)

module.exports = router;
// module.exports = getUserModel;
