const configDB = require('../config/database');

async function renderCommentDB(idVideo, lastId) {
    try {
        const [rows] = await configDB.query(
            `SELECT 
         c.id,
         c.user_id AS users,
         u.account,
         c.content,
         c.created_at AS created
       FROM comment c
       JOIN users u ON c.user_id = u.user_id
       WHERE c.id_video = ? AND c.id > ?
       ORDER BY c.id ASC
       LIMIT 10`,
            [idVideo, lastId]
        );

        return {
            success: true,
            messenger: "Danh sách comment từ DB",
            comments: rows
        };
    } catch (error) {
        console.log("Lỗi khi lấy comment", error);
        return { success: false, messenger: "Lỗi hệ thống" };
    }
}

module.exports = renderCommentDB;
