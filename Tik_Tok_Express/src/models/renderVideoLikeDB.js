const configDB = require('../config/database');

async function renderVideoLike(user_id, last_id) {
   try {
    const [rows] = await configDB.query(
        `SELECT v.id_video, v.path
         FROM video v
         INNER JOIN user_like ul ON v.id_video = ul.id_video
         WHERE ul.user_id = ? AND v.id_video > ?
         ORDER BY v.id_video ASC
         LIMIT 12`,
        [user_id, last_id]
    );

    return { success: true, message: "Lấy video đã thả tim thành công", likedVideos: rows };
    

} catch (error) {
    console.log("Lỗi lấy video đã thả tim:", error);
    return { success: false, message: "Lỗi hệ thống" };
}


}
module.exports = renderVideoLike; // xuất hàm renderVideoLike để sử dụng trong controller