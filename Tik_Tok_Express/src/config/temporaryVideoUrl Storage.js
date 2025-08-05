const multer = require('multer');

// Lưu file vào RAM thay vì ổ đĩa
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 500 * 1024 * 1024 // Giới hạn dung lượng tối đa (500MB)
    },
    fileFilter: (req, file, cb) => {
        // Chỉ chấp nhận file video
        if (!file.mimetype.startsWith('video/')) {
            return cb(new Error('Chỉ được upload file video'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;
