const renderVideoLikeDB = require("../models/renderVideoLikeDB");

async function renderVideoLike(req, res) {
    const user_id = req.query.user_id;// lấy ra user_id từ query
    const last_id = parseInt(req.query.last_id || 0); // ✅ ép kiểu và dùng 0 nếu không truyền
    try {

        const likeVideo = await renderVideoLikeDB(user_id, last_id)
        return res.status(200).json({
            success: true,
            messenger: "lấy video đã like thành công ",
            likeVideo: likeVideo.likedVideos

        })

    } catch (error) {
        console.log('lỗi khi lấy video đã like', error)
        return res.status(500).json({ success: false, messenger: "lỗi khi lấy video đã like" });

    }

}

module.exports = renderVideoLike; // Xuất hàm renderVideoLike để sử dụng trong các route khác