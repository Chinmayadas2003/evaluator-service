import Redis from "ioredis";

import ServerConfig from "./serverConfig";

const redisConfig = {
  ServerConfig.REDIS_PORT,
  ServerConfig.REDIS_HOST,
};

const redisConnection = new Redis(redisConfig);

export default redisConnection;
