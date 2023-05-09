const { Comments, Posts } = require('../models');

// Repostitory ? 데이터와 직접 소통하는 구간 // 주방쪽에서 주방장이 재료받아오는거
class CommentRepository {
  //댓글 생성
  createComment = async (comment, userId, postId) => {
    const createPostData = await Comments.create({
      UserId: userId,
      PostId: postId,
      comment,
    });
    return createPostData;
  };
  findOnePost = async (postId) => {
    const findOnePost = await Posts.findByPk(postId);
    return findOnePost;
  };
  ///////////////
  // 댓글 상세조회(프레임 워크 12쪽)

  //findOnePost위에꺼 사용
  findAllComment = async (postId) => {
    const findAllComment = await Comments.findAll({
      where: { postId },
    });
    return findAllComment;
  };
}
module.exports = CommentRepository;
