const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { Op } = require('sequelize');
const { Posts, Users } = require('../models');

//내 롱링페이퍼 삭제 : DELETE -> /posts/:postId
router.delete('/:postId', authMiddleware, async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { postId } = req.params;

        //롱링페이퍼 유효성 검증
        const post = await Posts.findOne({ where: { postId } });
        if (!post) {
            return res
                .status(403)
                .json({ errorMessage: '롱링페이퍼가 존재하지 않습니다.' });
        }
        //롱링페이퍼 권한 확인 후 삭제
        if (userId === post.UserId) {
            await Posts.destroy({
                where: {
                    [Op.and]: [{ postId }, { UserId: userId }],
                },
            });
            return res
                .status(200)
                .json({ message: '내 롱링페이퍼를 삭제하였습니다.' });
        } else {
            return res
                .status(403)
                .json({ message: '롱링페이퍼를 삭제할 권한이 없습니다.' });
        }
    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .send({ errorMessage: '롱링페이퍼 삭제에 실패하였습니다.' });
    }
});


//롤링 페이퍼 생성api 
router.post("/posts",authMiddleware, async(req,res)=>{
    try{
    const {userId} = res.locals.user
    const {title, content} = req.body

    if(title===null&&content===null){
     return res.status(400).json({errorMessage : "제목 또는 내용을 입력하세요."})
    }
    
    await Posts.create({
        postId : postId
        UserId : userId,
        title : title,
        content : content,
    })
return res.status(200).json({message : "롤 생성에 성공하였습니다."})
}catch(err){
    res.status(400).json({errorMessage : "롤 생성에 실패하였습니다."})
}

})


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
