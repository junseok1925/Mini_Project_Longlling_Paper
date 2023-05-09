const CommentRepository = require('../repositories/comments.repository');
class CommentService {
  commentRepository = new CommentRepository();

  //댓글 생성
  createComment = async (comment, userId, postId) => {
    const createPostData = await this.commentRepository.createComment(
      comment,
      userId,
      postId,
    );
    return createPostData;
  };
  findOnePost = async (postId) => {
    const findOnePost = await this.commentRepository.findOnePost(postId);
    return findOnePost;
  };
  ////
  //댓글 상세조회
  findAllComment = async (postId) => {
    const findAllComment = await this.commentRepository.findAllComment(postId);
    return findAllComment;
  };
  
}
module.exports = CommentService;
