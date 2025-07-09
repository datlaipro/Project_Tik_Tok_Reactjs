const multer = require('multer');
const upload = multer({ dest: 'temp/' }); // lưu file tạm
module.exports = upload;
