const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
        
    } else {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;     // Gắn thông tin người dùng đã giải mã vào req
            next();                 // Cho phép đi tiếp đến route tiếp theo
        } catch (err) {
            
            res.status(403).json({ message: "lỗi hệ thống" });
        }
    }


}
module.exports = authMiddleware; // Xuất middleware để sử dụng trong các route khác