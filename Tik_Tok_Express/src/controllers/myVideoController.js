const my_videos = require("../models/myVideoListDB");

async function myVideoController(req, res) {
  const user_id = req.query.user_id;
  const last_id = parseInt(req.query.last_id || 0); // ✅ ép kiểu và dùng 0 nếu không truyền

  try {
    const result = await my_videos(user_id, last_id); // ✅ truyền cả last_id
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Lấy my video thành công",
        myvideo: result.myvideo,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message || "Lỗi không xác định",
      });
    }
  } catch (error) {
    console.log("lỗi nhận dữ liệu từ fe", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi lấy my video",
    });
  }
}

module.exports = myVideoController;
