const UserService = require('../services/users.service');
const { Users } = require('../models');
const { setToken } = require('../middlewares/token'); // token.js에서 setToken 함수를 가져온다.

class UserController {
  userService = new UserService();
  //회원가입
  signup = async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    const { nickname, password, email } = req.body;
    console.log(nickname, password, email);
    try {
      // 1) 3가지 값 입력여부 확인
      // 2) 닉네임, 이메일 중복 확인
      //3) 회원가입 성공

      // 1)
      if (!nickname) {
        return res.status(412).json({ errorMessgae: '닉네임 입력 안함' });
      }
      if (!email) {
        return res.status(412).json({ errorMessgae: 'email 입력 안함' });
      }
      if (!password) {
        return res.status(412).json({ errorMessgae: 'password 입력 안함' });
      }
      // 2)
      //create하기전 Users에 있는 데이터를 가져온 것이 findOneUser의 값
      const findOneNickname = await this.userService.findOneNickname(nickname);
      const findOneEmail = await this.userService.findOneEmail(email);

      if (findOneNickname) {
        return res.status(412).json({ errorMessgae: '닉네임 중복임' });
      }
      if (findOneEmail) {
        return res.status(412).json({ errorMessgae: '이메일 중복임' });
      }
      // 3)
      await this.userService.signup(nickname, password, email);
      return res.status(200).json({ message: '회원가입성공' });
    } catch (err) {
      console.error(err);
      return res.status(412).json({ errorMessgae: 'catch 가입 실패' });
    }
  };

  //로그인
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const findOneEmail = await this.userService.findOneEmail(email);
      if (!findOneEmail) {
        return res.status(412).json({ errorMessgae: '닉네임 확인바람' });
      }
      const findOnePassword = await this.userService.findOnePassword(password);
      if (!findOnePassword) {
        return res.status(412).json({ errorMessgae: '비밀번호 확인바람' });
      }
      // setToken 함수를 사용하여 accessToken과 refreshToken을 생성합니다.
      const { accessToken, refreshToken } = setToken(findOneEmail.userId);
      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken);
      res.status(200).json({ message: '로그인 성공' });
    } catch (err) {
      console.error(err);
      return res.status(412).json({ errorMessgae: '로그인 실패' });
    }
  };

  // 마이페이지
  mypage = async (req, res) => {
    const { userId } = res.locals.user;
    try {
      if (!userId) {
        return res.status(412).json({ errorMessgae: '조회권한 없음' });
      }

      const userInfo = await this.userService.findOneUserInfo(userId);
      const allMyPost = await this.userService.findAllPost(userId);
      const allMyComment = await this.userService.findAllComment(userId);
      return res.status(200).json({ data: userInfo, allMyPost, allMyComment });
    } catch (err) {
      console.error(err);
      return res.status(412).json({ errorMessgae: '마이페이지 조회실패' });
    }
  };

  // 신고기능
  banComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    try {
      //commentId
      const findOneComment = await this.userService.findOneComment(commentId);
      //신고할 댓글 있는지 확인
      if (!findOneComment) {
        return res
          .status(400)
          .json({ errorMessage: '신고할 댓글이 없습니다.' });
      }
      //신고당할 유저ID찾기
      const user = await Users.findByPk(findOneComment.UserId);
      if (!user) {
        return res
          .status(400)
          .json({ errorMessage: '댓글 작성자를 찾을 수 없습니다.' });
      }

      user.banCount += 1;
      await user.save();
      if (user.banCount >= 3) {
        await Users.destroy({
          where: { userId: findOneComment.UserId },
        });
        return res.status(200).json({
          message:
            '부적절한 댓글작성 3회 이상으로 해당사용자는 서비스 이용이 중지되었습니다.',
        });
      }
      //신고 받은 댓글 삭제
      const deleteComment = await this.userService.deleteComment(commentId);
      return res.status(200).json({ message: '신고로 삭제되었습니다!' });
    } catch (err) {
      console.error(err);
      return res.status(200).json({
        message: '댓글 신고에 실패하였습니다.',
      });
    }
  };
}
module.exports = UserController;
