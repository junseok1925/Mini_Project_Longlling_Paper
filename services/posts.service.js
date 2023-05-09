const PostRepository = require('../repositories/posts.repository');
const { Posts } = require('../models');
class PostService {
  postRepository = new PostRepository(Posts);
  //롤링페이퍼 생성
  createPost = async (nickname, userId, title, content) => {
    const createPostData = await this.postRepository.createPost(
      nickname,
      userId,
      title,
      content,
    );
    return createPostData;
  };
  //롤링페이퍼 수정
  putPost = async (postId, title, content) => {
    const checkPost = await this.postRepository.putPost(postId, title, content);
    return checkPost;
  };
  findOnePost = async (postId) => {
    const findOnePost = await this.postRepository.findOnePost(postId);
    return findOnePost;
  };
  //롤링페이퍼 삭제
  deletePost = async (postId) => {
    const deletePost = await this.postRepository.deletePost(postId);
    return deletePost;
  };
}

module.exports = PostService;
