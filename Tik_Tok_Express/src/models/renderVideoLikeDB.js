// src/services/renderVideoLike.js
const configDB = require('../config/database');
const { redisClient, ensureConnected } = require('../config/redisClient');

const ONE_DAY = 60 * 60 * 24;

async function renderVideoLike(user_id, last_id) {
  const cacheKey = `likevideo:${user_id}:${last_id}`;

  try {
    // B1: đảm bảo Redis đã kết nối (không lỗi nếu Redis đang down)
    try { await ensureConnected(); } catch {}

    // B2: lấy cache nếu sẵn sàng
    if (redisClient.isReady) {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        console.log('✅ Lấy video đã thả tim từ Redis cache');
        let likedVideos = [];
        try { likedVideos = JSON.parse(cached); } catch {}
        return {
          success: true,
          message: 'Lấy video đã thả tim (cache)',
          likedVideos,
        };
      }
    } else {
      console.warn('⚠️ Redis chưa sẵn sàng (get), bỏ qua cache');
    }

    // B3: Query DB
    const [rows] = await configDB.query(
      `SELECT v.id_video, v.path
       FROM video v
       INNER JOIN user_like ul ON v.id_video = ul.id_video
       WHERE ul.user_id = ? AND v.id_video > ?
       ORDER BY v.id_video ASC
       LIMIT 12`,
      [user_id, last_id]
    );

    // B4: Cache kết quả (TTL 1 ngày)
    if (redisClient.isReady) {
      await redisClient.setEx(cacheKey, ONE_DAY, JSON.stringify(rows));
      console.log('📦 Đã cache video đã thả tim');
    } else {
      console.warn('⚠️ Redis chưa sẵn sàng (set), bỏ qua cache');
    }

    return {
      success: true,
      message: 'Lấy video đã thả tim thành công',
      likedVideos: rows,
    };
  } catch (err) {
    console.log('❌ Lỗi lấy video đã thả tim:', err);
    return { success: false, message: 'Lỗi hệ thống' };
  }
}

module.exports = renderVideoLike;
