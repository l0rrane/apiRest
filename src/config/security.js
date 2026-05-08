const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // 5 requisições
  message: "Muitas requisições, tente novamente depois. GABRIELA RGM:2417533"
});

module.exports = limiter;
