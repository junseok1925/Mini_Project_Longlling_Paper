const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const { Posts } = require("../models");

router.post("/posts",authMiddleware, async(req,res)=>{
    try{
    const {userId} = res.locals.user
    const {title, content} = req.body
    const RE_TITLE = 
    const RE_CONTENT = 
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


module.exports = router;
