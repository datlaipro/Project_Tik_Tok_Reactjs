const rateLimit = require("express-rate-limit");

const commentLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 giây
  max: 20, // Giới hạn 20 comment trong 10 giây
  message: "Bạn đang gửi quá nhiều bình luận, vui lòng thử lại sau.",
});
module.exports=commentLimiter