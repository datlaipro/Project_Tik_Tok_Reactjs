const configDB = require('../config/database'); // chỉnh đúng đường dẫn đến file database.js

async function upLoadVideoDB(videoUrl, visibility, userId) {

    try {
        const result = await configDB.query(
            "INSERT INTO video (path,visibility, user_id) VALUES (?, ?,?)",
            [videoUrl,visibility, userId]
        );
        return { success: true, message: "Video đã được lưu thành công", videoId: result[0].insertId };

    } catch (error) {
        console.error("Lỗi khi lưu video:", error);
        throw error; // Ném lỗi để xử lý ở nơi khác
    }
}

module.exports = { upLoadVideoDB }; // Xuất hàm lưu video vào cơ sở dữ liệu