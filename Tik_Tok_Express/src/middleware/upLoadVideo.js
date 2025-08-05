const multer = require('multer');

// Lưu file vào RAM để req.file.buffer có dữ liệu
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 500 * 1024 * 1024 // giới hạn 500MB
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('video/')) {
            return cb(new Error('Chỉ được upload file video'));
        }
        cb(null, true);
    }
});

module.exports = upload;
