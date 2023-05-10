const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comments.controller');
const commentController = new CommentController();
const authMiddleware = require('../middlewares/auth-middleware');

//#Controller? clients와 method로 소통하는 구간// 식당에서 홀 구역

// 댓글 생성
router.post(
  '/posts/:postId/comments',
  authMiddleware,
  commentController.createComment,
);

// 내 롤링페이퍼 댓글 상세조회
router.get('/posts/:postId/comments', commentController.detailComment);

module.exports = router;
