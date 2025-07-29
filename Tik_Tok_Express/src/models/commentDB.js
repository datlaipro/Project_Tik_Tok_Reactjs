const configDB = require('../config/database'); // chỉnh đúng đường dẫn đến file database.js


async function creatCommentDB(userId, idVideo, content) {

    try {
        const [result] = await configDB.query(
            'INSERT INTO comment (user_id, id_video, content) VALUES (?, ?, ?)',
            [userId, idVideo, content]
        );

       

        await configDB.query(
            `INSERT INTO \`comment_count\` (id_video, quantity) VALUES (?, 1)
         ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
            [idVideo]
        );
        return { success: true, messenger: "thêm comment thành công" }
    } catch (error) {
        return { success: false, message: 'Lỗi hệ thống khi xử lý comment' };

    }


}
module.exports = { creatCommentDB }