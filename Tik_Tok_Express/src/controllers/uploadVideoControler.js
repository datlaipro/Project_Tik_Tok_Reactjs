
const express = require('express');
const cloudinary = require('../config/cloudinary'); // Import cấu hình Cloudinary
const fs = require('fs');// Thư viện fs để xử lý file hệ thống
const upLoadVideoDB = require('../models/upLoadVideoDB'); // Import model lưu video
// Sử dụng multer để lưu file tạm
async function upLoadVideo(req, res) {


    try {
        const filePath = req.file.path;

        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'video',
            folder: 'my_videos',
        });

        // Lưu vào DB
        await upLoadVideoDB.upLoadVideoDB(result.secure_url, req.body.visibility, req.user.user_id);

        // Xóa file tạm
        fs.unlinkSync(filePath);

        res.json({ url: result.secure_url, message: 'Video uploaded successfully' });
    } catch (error) {
        console.error("Upload lỗi:", error);
        res.status(500).json({ message: 'Lỗi upload video', error });
    }

}


module.exports = upLoadVideo;
