const renderVideoDB = require('../models/renderVideoDB');

async function videoPublic(req, res) {
    const videoPath = await renderVideoDB.renderVideoDB();

    return res.status(200).json({
        success: true,
        path: videoPath, // Trả về đường dẫn video có visibility là 'public'
        message: 'Danh sách video công khai',
    })

}
module.exports = { videoPublic }; // Xuất hàm videoPublic để sử dụng trong các route khác