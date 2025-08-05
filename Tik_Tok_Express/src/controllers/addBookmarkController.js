const bookmarkedVideos = require('../models/addBookMarkDB'); // chỉnh đúng đường dẫn đến file renderVideoBookmarkDB.js

async function addBookmarkController(req, res) {
 const { userID, idVideo } = req.body
    try {
        const result = await bookmarkedVideos(userID, idVideo)
        if(result.success===true){
            return res.status(200).json({success:true,message:"cập nhật bookmark thành công"})
        }

    } catch (err) {
        console.error(' error:', err);
        return res.status(500).json({ success: false, message: 'lỗi xử lí ' });
    }


}

module.exports = addBookmarkController; // Xuất hàm addBookmarkController để sử dụng trong các route khác