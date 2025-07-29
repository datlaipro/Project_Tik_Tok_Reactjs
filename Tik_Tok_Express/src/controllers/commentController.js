const commentDB = require("../models/commentDB")

async function listComment(req, res) {
    const { userID, idVideo, comments } = req.body
    try {
        const result = await commentDB.creatCommentDB(userID, idVideo, comments)
        if (result.success === true) {
            return res.status(200).json({
                success: true,
                message: "thêm comment thành công",
                comment: result.comment//trả về danh sách comment
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "lỗi khi thêm comment "
            })
        }
    } catch (error) {
        console.log('lỗi khi nhận thông tin từ fe', error

        )
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống khi xử lý comment',
        });
    }

}

module.exports = listComment