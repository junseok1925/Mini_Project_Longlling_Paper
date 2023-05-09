const { Posts } = require('../models');

// Repostitory ? 데이터와 직접 소통하는 구간 // 주방쪽에서 주방장이 재료받아오는거
class PostRepository {
  //롤링페이퍼 생성
  createPost = async (nickname, userId, title, content) => {
    const createPostData = await Posts.create({
      nickname,
      UserId: userId,
      title,
      content,
    });
    return createPostData;
  };

  //롤링페이퍼 수정
  putPost = async (postId, title, content) => {
    const checkPost = await Posts.findByPk(postId);
    const putPost = await checkPost.update(
      { title, content },
      { where: { postId: postId } },
    );
    return putPost;
  };
  findOnePost = async (postId) => {
    const findOnePost = await Posts.findByPk(postId);
    return findOnePost;
  };
  //롤링페이퍼 삭제

  //findOnePost이용
  deletePost = async (postId) => {
    const deletePost = await Posts.findByPk(postId);
    await deletePost.destroy();
    return;
  };
}
module.exports = PostRepository;
