const Redis = require("ioredis");
const redis = new Redis({
  port:"13974",
  host:"redis-13974.c299.asia-northeast1-1.gce.cloud.redislabs.com",
  username:"default",
  password:process.env.REDIS_PASSWORD,
});
module.exports = redis