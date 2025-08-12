// src/config/redisClient.js
const redis = require('redis');

const {
  REDIS_HOST = '127.0.0.1',
  REDIS_PORT = 6379,
  REDIS_PASSWORD = ''
} = process.env;

const redisClient = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    reconnectStrategy: (retries) => {
      // Backoff: 100ms, 200ms, ... max 3s
      if (retries > 50) return new Error('Redis retry limit'); // tránh loop vô hạn
      return Math.min(retries * 100, 3000);
    },
  },
  // KHÔNG dùng username với Redis local (username chỉ cho Redis Cloud/ACL)
  password: REDIS_PASSWORD || undefined,
});

redisClient.on('ready', () => console.log('✅ Redis ready (local)'));
redisClient.on('reconnecting', () => console.warn('🔁 Redis reconnecting...'));
redisClient.on('end', () => console.warn('🛑 Redis connection closed'));
redisClient.on('error', (err) => console.error('💥 Redis error:', err));

let connectOnce;
async function ensureConnected() {
  if (redisClient.isOpen || redisClient.isReady) return;
  // tránh gọi connect() nhiều lần song song
  if (!connectOnce) {
    connectOnce = redisClient.connect().catch((e) => {
      connectOnce = undefined;
      throw e;
    });
  }
  await connectOnce;
}

module.exports = { redisClient, ensureConnected };
