const configDB = require('../config/database');

async function updateLikeDB(idVideo, quantity) {
  try {
    const [result] = await configDB.query(`
      INSERT INTO \`like\` (id_video, quantity)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)
    `, [idVideo, quantity]);

    return {
      success: true,
      message: "Cập nhật like thành công",
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    console.error("Lỗi khi cập nhật like:", error);
    return { success: false, message: "Đã xảy ra lỗi khi cập nhật like" };
  }
}

module.exports = {updateLikeDB};
