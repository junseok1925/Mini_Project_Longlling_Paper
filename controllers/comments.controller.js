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
          .json({ errorMessage: '롤링페이퍼가 존재하지않습니다.' });
      }
      if (!comment) {
        return res
          .status(403)
          .json({ errorMessage: '친구에게 남길 메세지를 작성해주세요.' });
      }
      const createPostData = await this.commentService.createComment(
        comment,
        userId,
        postId,
      );
      return res.status(200).json({ message: '메세지을 작성하였습니다.' });
    } catch (err) {
      console.error(err);
      return res
        .status(403)
        .json({ errorMessage: '메세지 작성에 실패했습니다.' });
    }
  };

  //댓글 상세조회
  detailComment = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const findOnePost = await this.commentService.findOnePost(postId);
      const findAllComment = await this.commentService.findAllComment(postId);
      return res.status(200).json({ findOnePost, findAllComment });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '나에게 달린 메세지 조회 실패' });
    }
  };
}

module.exports = CommentController;
