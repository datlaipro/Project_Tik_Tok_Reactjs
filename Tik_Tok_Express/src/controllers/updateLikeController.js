const updateLike = require('../models/updateLikeDB')

async function updateLikeController(req, res) {
    const { quantityLike, idVideo } = req.body
    try {
        const result = await updateLike.updateLikeDB(idVideo, quantityLike)
        if(result.success===true){
            return res.status(200).json({success:true,message:"cập nhật like thành công"})
        }

    } catch (err) {
        console.error(' error:', err);
        return res.status(500).json({ success: false, message: 'lỗi xử lí ' });
    }

}

module.exports = updateLikeController;