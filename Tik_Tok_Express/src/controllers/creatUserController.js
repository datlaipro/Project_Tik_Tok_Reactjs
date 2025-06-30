const creatUserDB = require('../models/creatUserDB'); // Chỉnh đúng đường dẫn đến file creatUserDB.js

async function creatAccountController(req, res) {
  const { account, password } = req.body;

  try {
    // Gọi hàm từ model để thêm user vào DB
    const result = await creatUserDB.creatUserDB(account, password);

    // Trả phản hồi về client
    res.status(201).json({
      success: true,
      message: 'Tạo tài khoản thành công',
      userId: result.insertId
    });
  } catch (err) {
    console.error('Lỗi tạo tài khoản:', err);
    res.status(500).json({
      success: false,
      message: 'Tạo tài khoản thất bại'
    });
  }

}

module.exports = { creatAccountController };