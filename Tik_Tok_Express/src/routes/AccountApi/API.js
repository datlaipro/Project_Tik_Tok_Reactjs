// routes/AccountApi/API.js
const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/verifyCookie');
const verifyRefreshToken = require('../../middleware/verifyRefreshToken');

const userLogin = require('../../controllers/loginUserController');
const creatAccountController = require('../../controllers/creatUserController');
const videoPublicController = require('../../controllers/videoPublicController');
const profileUser = require('../../controllers/profileController');
const logoutController = require('../../controllers/logoutController');
const upload = require('../../middleware/upLoadVideo');
const upLoadVideo = require('../../controllers/uploadVideoControler');
const updateLike = require('../../controllers/updateLikeController');
const postComment = require('../../controllers/commentController');
const renderComment = require('../../controllers/renderCommentController');
const limitComment = require('../../middleware/commentLimiter');
const myvideo = require('../../controllers/myVideoController');
const videoBookmark = require('../../controllers/renderVideoBookmark');
const likeVideo = require('../../controllers/renderVideoLike');
const addBookMark = require('../../controllers/addBookmarkController');

// === PUBLIC (KHÔNG YÊU CẦU TOKEN)
router.post('/login', userLogin.loginUserController);
router.post('/createUser', creatAccountController.creatAccountController);
router.get('/requestVideo', videoPublicController.videoPublic);

// === REFRESH (chỉ yêu cầu refresh cookie, KHÔNG dùng authMiddleware)
router.get('/refresh/profile', verifyRefreshToken, profileUser.profileController);
router.post('/refresh/logout', verifyRefreshToken, logoutController.logOutAccount);
router.get('/refresh/token', verifyRefreshToken, (req, res) => {
  res.json({ success: true, message: 'Token refreshed' });
});

// === BẢO VỆ (mọi route phía dưới mới yêu cầu access_token)
router.use(authMiddleware);
router.post('/addBookmark', addBookMark);
router.get('/videoBookmark', videoBookmark);
router.post('/upload', upload.single('video'), upLoadVideo);
router.get('/likeVideo', likeVideo);
router.post('/postcomment', limitComment, postComment);
router.get('/getcomments', renderComment);
router.post('/like', updateLike);
router.get('/myvideo', myvideo);

module.exports = router;
