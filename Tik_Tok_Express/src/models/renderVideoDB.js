const configDB = require('../config/database');

async function renderVideoDB(lastId) {
  try {
    const [results] = await configDB.query(// truy vấn này lấy ra comment, like , bookmar , path của video 
      `
      SELECT 
        v.id_video, 
        v.path,
         v.user_id,
        COALESCE(l.quantity, 0) AS likes,
        COALESCE(cc.quantity, 0) AS comments,
        COALESCE(b.quantity, 0) AS bookmarks
      FROM video v
      LEFT JOIN \`like\` l ON v.id_video = l.id_video
      LEFT JOIN comment_count cc ON v.id_video = cc.id_video
      LEFT JOIN bookmark b ON v.id_video = b.id_video
      WHERE v.visibility = 'public' AND v.id_video > ?
      ORDER BY v.id_video ASC
      LIMIT 5
      `,
      [lastId]
    );
    return results;
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
    return { success: false, message: 'Lỗi hệ thống' };
  }
}

module.exports = { renderVideoDB };
