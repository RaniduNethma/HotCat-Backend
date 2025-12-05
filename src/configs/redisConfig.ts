import { createClient, RedisClientType } from 'redis';
import { env } from "./envConfig.js";

const client: RedisClientType = createClient({
  url: env.REDIS_HOST + env.REDIS_PORT,
  password: env.REDIS_PASSWORD
});

async function connectRedis(): Promise<void> {
  await client.connect();
  console.log('Successfully connected to Redis');
}

client.on('error', (err: Error) => {
  console.error('Redis connection error:', err);
});

connectRedis().catch(console.error);
