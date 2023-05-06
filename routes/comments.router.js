const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const { Op } = require("sequelize");
const { Comments, Posts } = require("../models");

//친구 롱링페이퍼에 댓글생성 : POST -> /posts/:postId/comments
router.post("/posts/:postId/comments", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;

    //롱링페이퍼 유효성 검증
    const post = await Posts.findOne({ where: { postId } });
    if (!post) {
      return res
        .status(403)
        .json({ errorMessage: "롱링페이퍼가 존재하지 않습니다." });
    }

    //메시지 생성
    if (!comment) {
      return res
        .status(403)
        .json({ errorMessage: "친구에게 남길 메시지를 작성해주세요" });
    } else {
      await Comments.create({
        UserId: userId,
        PostId: postId,
        comment,
      });
      return res.status(200).json({ message: "메시지를 작성하였습니다." });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .send({ errorMessage: "메시지 작성에 실패하였습니다." });
  }
});

// 롱링페이지 상세조회(프레임워크 12P)
router.get("/posts/:postId/comments", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    const postUser = await Posts.findOne({ where: { postId } });
    console.log(userId);
    console.log(postUser.UserId);
    if (userId !== postUser.UserId) {
      return res
        .status(400)
        .json({ errorMessage: "댓글조회 권한이 없습니다." });
    }
    const comments = await Comments.findAll({
      attributes: [
        "commentId",
        "UserId",
        "PostId",
        "comment",
        "createdAt",
        "updatedAt",
      ],
      where: { PostId: postId },
    });

    res.status(200).json({ results: comments });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "롱링페이지 조회에 실패하였습니다." });
  }
});

module.exports = router;
