const configDB = require('../config/database');
const redisClient = require('../config/redisClient'); // kiểm tra đúng đường dẫn nhé

async function renderVideoBookmark(user_id, last_id) {
  const cacheKey = `bookmark:${user_id}:${last_id}`;

  try {
    // 🧠 B1: Kiểm tra cache Redis nếu sẵn sàng
    if (redisClient.isReady) {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        console.log("✅ Lấy video đã bookmark từ Redis cache");
        return {
          success: true,
          message: "Lấy video đã bookmark (cache)",
          bookmarkedVideos: JSON.parse(cached),
        };
      }
    } else {
      console.warn("⚠️ Redis chưa sẵn sàng (get), bỏ qua cache");
    }

    // 🧠 B2: Truy vấn DB
    const [rows] = await configDB.query(
      `SELECT v.id_video, v.path
       FROM video v
       INNER JOIN user_bookmark ub ON v.id_video = ub.id_video
       WHERE ub.user_id = ? AND v.id_video > ?
       ORDER BY v.id_video ASC
       LIMIT 12`,
      [user_id, last_id]
    );

    // 🧠 B3: Lưu vào Redis nếu sẵn sàng
    if (redisClient.isReady) {
      await redisClient.setEx(cacheKey, 86400, JSON.stringify(rows));
      console.log("📦 Cache video đã bookmark vào Redis");
    } else {
      console.warn("⚠️ Redis chưa sẵn sàng (set), bỏ qua cache");
    }

    return {
      success: true,
      message: "Lấy video đã bookmark thành công",
      bookmarkedVideos: rows,
    };

  } catch (error) {
    console.error("❌ Lỗi lấy video đã bookmark:", error);
    return { success: false, message: "Lỗi hệ thống" };
  }
}

module.exports = renderVideoBookmark;
