

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });// tìm file env ở thư mục gốc
const { S3Client } = require('@aws-sdk/client-s3');

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT ,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY 
  },
});

module.exports = r2;
