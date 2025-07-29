const renderVideoDB = require('../models/renderVideoDB');

async function videoPublic(req, res) {
      const lastId = parseInt(req.query.lastId) || 0;

    const videoPath = await renderVideoDB.renderVideoDB(lastId);

    return res.status(200).json({
        success: true,
        path: videoPath, // Trả về danh sách đường dẫn video có visibility là 'public'
        message: 'Danh sách video công khai',
        id:videoPath.id_video
    })

}
module.exports = { videoPublic }; // Xuất hàm videoPublic để sử dụng trong các route khác