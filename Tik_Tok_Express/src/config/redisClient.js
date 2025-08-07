const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        reconnectStrategy: retries => {
            console.warn("🔁 Đang thử kết nối lại Redis...");
            if (retries > 5) return new Error("Redis retry limit");
            return Math.min(retries * 100, 3000); // backoff
        },
    },
    username: 'default', // nếu dùng Redis Cloud
    password: process.env.REDIS_PASSWORD,
});

(async () => {
    try {
        await redisClient.connect();
        console.log("✅ Redis đã kết nối");
    } catch (error) {
        console.error("❌ Kết nối Redis thất bại:", error);
    }
})();

redisClient.on('error', (err) => {
    console.error("💥 Redis error event:", err);
});

module.exports = redisClient;
