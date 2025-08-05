const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });//tìm file env ở thư mục gốc


const { PutObjectCommand } = require('@aws-sdk/client-s3');
const r2 = require('./cloudFareR2');

const { randomUUID } = require('crypto');

async function uploadToR2(file) {
  const ext = path.extname(file.originalname); // Lấy phần mở rộng (.mp4, .mov...)
  const key = `post/${randomUUID()}${ext}`;    // Tạo tên file duy nhất

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
     ContentLength: file.size, // ✅ quan trọng khi upload video
  });

  await r2.send(command);

  const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

  return {
    key,       // tên file trên R2
    url: publicUrl // link public
  };
}

module.exports = uploadToR2;
