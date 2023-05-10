const UserRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');
//주방에서 조리사가 일차 가공
class UserService {
  userRepository = new UserRepository();
  // 회원가입
  signup = async (nickname, password, email) => {
    const signupData = await this.userRepository.createUser(
      nickname,
      password,
      email,
    );
    return signupData;
  };
  findOneNickname = async (nickname) => {
    const findOneNickname = await this.userRepository.findOneNickname(nickname);
    return findOneNickname;
  };
  findOneEmail = async (email) => {
    const findOneEmailData = await this.userRepository.findOneEmail(email);
    return findOneEmailData;
  };
  // 로그인
  login = async (email, password) => {
    const user = await this.userRepository.findOneEmail(email);
    const { accessToken, refreshToken } = setToken(user.userId);
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    return { token };
  };
  findOnePassword = async (password) => {
    const findOnePassword = await this.userRepository.findOnePassword(password);
    return findOnePassword;
  };
  // 마이페이지
  findOneUserInfo = async (userId) => {
    const findOneUserInfo = await this.userRepository.findOneUserInfo(userId);
    return findOneUserInfo;
  };
  findAllPost = async (userId) => {
    const findAllPost = await this.userRepository.findAllPost(userId);
    return findAllPost;
  };
  findAllComment = async (userId) => {
    const findAllComment = await this.userRepository.findAllComment(userId);
    return findAllComment;
  };

  // 신고기능
  findOneComment = async (commentId) => {
    const findOneComment = await this.userRepository.findOneComment(commentId);
    return findOneComment;
  };
  //신고 받은 댓글 삭제
  deleteComment = async (commentId) => {
    const deleteComment = await this.userRepository.deleteComment(commentId);
    return deleteComment;
  };
  //신고 받은 유저아이디 삭제
  deleteUser = async(commentId)=>{
    const deleteUser = await this.userRepository.deleteUser(userId,commentId)
    return deleteUser
  }


}

module.exports = UserService;
