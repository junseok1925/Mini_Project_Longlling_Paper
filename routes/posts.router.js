const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const { Posts } = require("../models");

// [채민] 롤 수정 : put, /api/posts/:postId, 롤링페이퍼 상세화면(p.15)
router.put("posts/:postId", authMiddleware,
    async (req, res) => { 
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
      const { nickname, UserId } = res.locals.user;

      const post = await Posts.findOne({
        where: { postId: postId } 
      });

      if (!post) return res.status(404).json({ errorMessage: "게시글이 존재하지 않습니다." });

      if (post.nickname !== nickname)
        return res.status(403).json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });

      await Posts.update(
        { title, content },
        { where: { postId: postId } }
      ).catch((err) => {
        return res.status(401).json({ errorMessage: "게시글이 정상적으로 수정되지 않았습니다." });
      });

      return res.status(200).json({ message: "게시글을 수정하였습니다." });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ errorMessage: "게시글 수정에 실패하였습니다." });
    }
  }
);


module.exports = router;
