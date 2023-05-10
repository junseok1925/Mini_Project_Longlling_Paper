const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");
const userController = new UserController();
const authMiddleware = require("../middlewares/auth-middleware")

//#Controller? clients와 method로 소통하는 구간// 식당에서 홀 구역

// 회원가입 API
router.post("/signup", userController.signup);
// 로그인 API
router.post("/login", userController.login);
// // 마이페이지 API
router.get("/users", authMiddleware, userController.mypage);
// 댓글 신고시 댓글 삭제 및 3번이상 강퇴
router.post("/comments/:commentId/report", authMiddleware, userController.banComment)
module.exports = router;