
const upLoadVideoDB = require('../models/upLoadVideoDB');
const uploadToR2 = require('../config/upLoadToR2');

async function upLoadVideo(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Không có file video được tải lên' });
        }


        // Upload lên R2
        const { key, url } = await uploadToR2(req.file);

        // Lưu vào DB (ở đây bạn có thể lưu cả key để sau xóa cho dễ)
        await upLoadVideoDB.upLoadVideoDB(url, req.body.visibility, req.user.user_id);

        res.json({ key, url, message: 'Video uploaded successfully' });
    } catch (error) {
        console.error("Upload lỗi:", error);
        res.status(500).json({ message: 'Lỗi upload video', error });
    }
}

module.exports = upLoadVideo;
