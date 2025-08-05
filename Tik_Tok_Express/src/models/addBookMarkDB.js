const configDB = require('../config/database');

async function addBookMark(userID, idVideo) {

    try {
        // Kiểm tra user đã bookmark video chưa
        const [rows] = await configDB.query(
            'SELECT * FROM user_bookmark WHERE user_id = ? AND id_video = ?',
            [userID, idVideo]
        );

        if (rows.length > 0) {
            // Đã bookmark rồi nhưng sau đó bỏ bookmark
            await configDB.query(
                'DELETE FROM user_bookmark WHERE user_id = ? AND id_video = ?',
                [userID, idVideo]
            );

            // Giảm quantity trong bảng bookmark
            await configDB.query(
                'UPDATE `bookmark` SET quantity = quantity - 1 WHERE id_video = ? AND quantity > 0',
                [idVideo]
            );

            return { success: true, message: 'Đã bỏ bookmark video' };
        } else {
            // Chưa bookmark => thêm bookmark
            await configDB.query(
                'INSERT INTO user_bookmark (user_id, id_video) VALUES (?, ?)',
                [userID, idVideo]
            );

            // Tăng quantity trong bảng bookmark, nếu chưa có bản ghi thì thêm mới với quantity = 1
            await configDB.query(
                `INSERT INTO \`bookmark\` (id_video, quantity) VALUES (?, 1)
         ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
                [idVideo]
            );

            return { success: true, message: 'Đã bookmark video' };
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật bookmark:', error);
        console.error('userID:', userID, 'idVideo:', idVideo);

        if (error.sqlMessage) {
            console.error('📌 Lỗi SQL:', error.sqlMessage);
        }
        return { success: false, message: 'Lỗi hệ thống khi cập nhật bookmark' };
    }

}

module.exports = addBookMark; // xuất hàm addBookMark để sử dụng trong controller