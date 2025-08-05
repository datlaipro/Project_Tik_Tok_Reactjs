const videoBookmark = require('../models/renderVideoBookmarDB'); // chỉnh đúng đường dẫn đến file renderVideoBookmarkDB.js

async function renderVideoBookmarkController(req, res) {

 const user_id = req.query.user_id;// lấy ra user_id từ query
    const last_id = parseInt(req.query.last_id || 0); // ✅ ép kiểu và dùng 0 nếu không truyền

    try {
        
        const bookmarkVideo = await videoBookmark(user_id, last_id);
        return res.status(200).json({
            success: true,
            messenger: "lấy video đã bookmark thành công",
            videoBookmark: bookmarkVideo.bookmarkedVideos
        });
    } catch (error) {
        console.log('lỗi khi lấy video đã bookmark', error);
        return res.status(500).json({ success: false, messenger: "lỗi khi lấy video đã bookmark" });
        
    }

}
module.exports = renderVideoBookmarkController; // Xuất hàm renderVideoBookmarkController để sử dụng trong các route khác