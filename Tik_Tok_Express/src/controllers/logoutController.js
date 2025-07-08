

function logOutAccount(req, res) {
    res.clearCookie("token");// xoá cookie token để đăng xuất

    res.status(200).json({
        success: true,
        message: 'Đã đăng xuất',
        user: req.user // Trả về thông tin người dùng đã xác thực
    });


}

module.exports = { logOutAccount }; // Xuất hàm đăng xuất tài khoản