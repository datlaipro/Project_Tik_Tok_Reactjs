const configDB = require('../config/database');

async function renderVideoBookmarkDB(user_id, last_id) {
    try {
        const [rows] = await configDB.query(
            `SELECT v.id_video, v.path
             FROM video v
             INNER JOIN user_bookmark ub ON v.id_video = ub.id_video
             WHERE ub.user_id = ? AND v.id_video > ?
             ORDER BY v.id_video ASC
             LIMIT 12`,
            [user_id, last_id]
        );

        return { success: true, message: "Lấy video đã đánh dấu thành công", bookmarkedVideos: rows };
        
    } catch (error) {
        console.log("Lỗi lấy video đã đánh dấu:", error);
        return { success: false, message: "Lỗi hệ thống" };
    }
}
module.exports = renderVideoBookmarkDB; // xuất hàm renderVideoBookmarkDB để sử dụng trong controller