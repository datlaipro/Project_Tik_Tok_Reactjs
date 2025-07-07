
async function profileController(req, res) {

    

    return res.status(200).json({
        success: true,
        message: 'Thông tin người dùng',
        user: req.user // Trả về thông tin người dùng đã xác thực
    });


}

module.exports = { profileController }; // Xuất hàm profileController để sử dụng trong các route khác