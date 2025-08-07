const configDB = require('../config/database');
const redisClient = require('../config/redisClient');

async function myVideoList(userId, lastId) {
  const cacheKey = `myvideo:${userId}:${lastId}`;

  try {
    // 🧠 B1: Kiểm tra cache nếu Redis sẵn sàng
    if (redisClient.isReady) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("✅ Lấy video từ Redis cache");
        return {
          success: true,
          message: "Lấy video từ cache thành công",
          myvideo: JSON.parse(cachedData),
        };
      }
    } else {
      console.warn("⚠️ Redis chưa sẵn sàng, bỏ qua cache get");
    }

    // 🧠 B2: Query DB
    const [rows] = await configDB.query(
      `SELECT id_video, path 
       FROM video 
       WHERE user_id = ? AND id_video > ? 
       ORDER BY id_video ASC 
       LIMIT 12`,
      [userId, lastId]
    );

    // 🧠 B3: Cache nếu Redis sẵn sàng
    if (redisClient.isReady) {
      await redisClient.setEx(cacheKey, 86400, JSON.stringify(rows));
      console.log("📦 Lưu dữ liệu vào Redis cache");
    } else {
      console.warn("⚠️ Redis chưa sẵn sàng, bỏ qua cache set");
    }

    return {
      success: true,
      message: "Lấy video thành công từ DB",
      myvideo: rows,
    };

  } catch (error) {
    console.log("❌ Lỗi lấy video: ", error);
    return { success: false, message: "Lỗi hệ thống" };
  }
}

module.exports = myVideoList;
