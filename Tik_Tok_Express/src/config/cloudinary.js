// cấu hình Cloudinary để upload video lên Cloudinary
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dlb0exnkn',
  api_key: '846652488591476',
  api_secret: 'uLPP8bGmpQp43ld67UvePSTPQ0o',
});

module.exports = cloudinary;
