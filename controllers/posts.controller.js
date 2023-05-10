const PostService = require('../services/posts.service');

class PostController {
  postService = new PostService();
  //롤링페이퍼 생성
  createPost = async (req, res, next) => {
    const { userId, nickname } = res.locals.user;
    const { title, content } = req.body;
    try {
      if (!title && !content) {
        return res
          .status(400)
          .json({ errorMessage: '제목 또는 자기소개 내용을 입력하세요' });
      }
      await this.postService.createPost(nickname, userId, title, content);
      return res.status(200).json({ message: '롤링페이지를 생성하였습니다.' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: '롤링페이지 생성에 실패하였습니다.' });
    }
  };
  //롤링페이퍼 수정
  putPost = async (req, res, next) => {
    const { userId, nickname } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;
    try {
      const findOnePost = await this.postService.findOnePost(postId);
      if (!findOnePost) {
        return res
          .status(404)
          .json({ errorMessage: '롤링페이퍼가 존재하지 않습니다.' });
      }
      if (userId !== findOnePost.UserId) {
        return res.status(403).json({ errorMessage: '롤링페이퍼 수정 권한이 없습니다.' });
      }
      if (!title && !content) {
        return res
          .status(402)
          .json({ errorMessage: '제목 또는 내용을 입력하세요!' });
      }

      await this.postService.putPost(postId, title, content);
      return res.status(200).json({ message: '롤링페이퍼를 수정하였습니다.' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: '롤링페이퍼 수정에 실패하였습니다.' });
    }
  };
  //롤페이퍼 삭제
  deletePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    try {
      const findOnePost = await this.postService.findOnePost(postId);

      if (!findOnePost) {
        return res
          .status(400)
          .json({ errorMessage: '삭제할 롤링페이퍼가 없음' });
      }
      console.log(userId);
      console.log(findOnePost.UserId);
      if (userId !== findOnePost.UserId) {
        return res.status(400).json({ errorMessage: '삭제 권한 없음' });
      }
      await this.postService.deletePost(postId);
      return res.status(200).json({ message: '삭제 완료' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: '삭제 실패' });
    }
  };
}

module.exports = PostController;
