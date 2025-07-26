const configDB = require('../config/database');

async function toggleLike(userID, idVideo) {
  try {
    // Kiểm tra user đã like video chưa
    const [rows] = await configDB.query(
      'SELECT * FROM user_like WHERE user_id = ? AND id_video = ?',
      [userID, idVideo]
    );

    if (rows.length > 0) {
      // Đã like rồi nhưng sau đó bỏ like
      await configDB.query(
        'DELETE FROM user_like WHERE user_id = ? AND id_video = ?',
        [userID, idVideo]
      );

      // Giảm quantity trong bảng like
      await configDB.query(
        'UPDATE `like` SET quantity = quantity - 1 WHERE id_video = ? AND quantity > 0',
        [idVideo]
      );

      return { success: true, message: 'Đã bỏ thích video' };
    } else {
      // Chưa like => thêm like
      await configDB.query(
        'INSERT INTO user_like (user_id, id_video) VALUES (?, ?)',
        [userID, idVideo]
      );

      // Tăng quantity trong bảng like, nếu chưa có bản ghi thì thêm mới với quantity = 1
      await configDB.query(
        `INSERT INTO \`like\` (id_video, quantity) VALUES (?, 1)
         ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
        [idVideo]
      );

      return { success: true, message: 'Đã thích video' };
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật like:', error);
    console.error(userID,idVideo)
    return { success: false, message: 'Lỗi hệ thống khi cập nhật like' };
  }
}

module.exports = { toggleLike };
