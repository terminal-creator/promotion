/**
 * server/middleware/ratelimit.js
 * 创建渠道的 IP 限频中间件
 */

const rateLimit = require('express-rate-limit');

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000;
const max = Number(process.env.RATE_LIMIT_MAX) || 1;

const createLimiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: '请求过于频繁，请稍后再试' },
  keyGenerator: (req) => {
    // 取代理后的真实 IP（如果 nginx 设了 X-Real-IP）
    return req.headers['x-real-ip'] || req.ip;
  },
});

module.exports = { createLimiter };
