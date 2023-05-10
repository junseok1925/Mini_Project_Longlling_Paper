const CommentService = require('../services/comments.service');
const { Users, Comments } = require('../models');

class CommentController {
  commentService = new CommentService();
  createComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;
    try {
      const findOnePost = await this.commentService.findOnePost(postId);
      if (!findOnePost) {
        return res
          .status(403)
          .json({ errorMessage: '댓글 작성할 롤링페이퍼가 없음' });
      }
      if (!comment) {
        return res.status(403).json({ errorMessage: '댓글을 작성하삼' });
      }
      const createPostData = await this.commentService.createComment(
        comment,
        userId,
        postId,
      );
      return res.status(200).json({ message: '댓글작성완료' });
    } catch (err) {
      console.error(err);
      return res.status(403).json({ errorMessage: '댓글 작성 실패' });
    }
  };

  //댓글 상세조회
  detailComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    try {
      const findOnePost = await this.commentService.findOnePost(postId);
      console.log(userId);
      console.log(findOnePost.UserId);
      if (userId !== findOnePost.UserId) {
        return res.status(403).json({ errorMessage: '댓글 조회 권한 없음' });
      }
      const findAllComment = await this.commentService.findAllComment(postId);
      return res.status(200).json({ data: findAllComment });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '나에게 달린 댓글 조회 실패' });
    }
  };

}

module.exports = CommentController;
