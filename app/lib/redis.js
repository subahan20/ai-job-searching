import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Prevent multiple connections in Next.js development HMR
let redisConnection;

if (process.env.NODE_ENV === 'production') {
  redisConnection = new Redis(redisUrl, {
    maxRetriesPerRequest: null, // Critical requirement for BullMQ
  });
} else {
  if (!global._redisConnection) {
    global._redisConnection = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
    });
  }
  redisConnection = global._redisConnection;
}

export { redisConnection };
