const configDB = require('../config/database');

async function myVideoList(userId, lastId ) {
  try {
    const [rows] = await configDB.query(
      `SELECT id_video, path 
       FROM video 
       WHERE user_id = ? AND id_video > ? 
       ORDER BY id_video ASC 
       LIMIT 12`,
      [userId, lastId]
    );

    return { success: true, message: "Lấy video thành công", myvideo: rows };

  } catch (error) {
    console.log("lỗi lấy video ", error);
    return { success: false, message: "Lỗi hệ thống" };
  }
}

module.exports = myVideoList;
