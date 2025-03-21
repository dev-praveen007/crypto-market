const redis = require('redis');
let redisClient = redis.createClient();

const connectRedis = () => {
    try {
        redisClient.connect().catch(console.error);
    } catch (e) {
        console.log("error on redis connect", e)
    }
}

const setRedis = async (key, data) => await redisClient.setEx(key, process.env.REDIS_EXPIRE_SEC, JSON.stringify(data));

const getRedis = async (key) => await redisClient.get(key)

module.exports = {
    connectRedis,
    setRedis,
    getRedis
};