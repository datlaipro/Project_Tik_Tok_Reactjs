const creatUserDB = require('../models/creatUserDB');

async function creatAccountController(req, res) {
  const { account, password } = req.body;

  try {
    const result = await creatUserDB.creatUserDB(account, password);

    if (!result.success) {
      return res.status(409).json({ // HTTP 409 Conflict
        success: false,
        message: result.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Tạo tài khoản thành công',
      userId: result.userId,
      name: account // Trả về tên tài khoản đã tạo
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
