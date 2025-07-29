const rendComments = require('../models/renderCommentDB')

async function renderCommentController(req, res) {
    const lastId = parseInt(req.query.lastId) || 0;
    const idVideo = parseInt(req.query.idVideo);


    try {

        const comments = await rendComments(idVideo, lastId)
        return res.status(200).json({
            success: true,
            messenger: "thêm comments thành công ",
            comments: comments.comments

        })

    } catch (error) {
        console.log('lỗi khi nhận comment', error)
        return res.status(500).json({ success: false, messenger: "lỗi khi nhận comment" });

    }
}

module.exports = renderCommentController