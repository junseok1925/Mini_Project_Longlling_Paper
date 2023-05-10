const { Users, Posts, Comments } = require('../models');

// Repostitory ? 데이터와 직접 소통하는 구간 // 주방쪽에서 주방장이 재료받아오는거
class UserRepository {
  createUser = async (nickname, password, email) => {
    const createUserData = await Users.create({
      nickname,
      password,
      email,
    });
    return createUserData;
  };
  findOneNickname = async (nickname) => {
    const findOneNicknameData = await Users.findOne({
      where: { nickname: nickname },
    });
    return findOneNicknameData;
  };
  findOneEmail = async (email) => {
    const findOneEmailData = await Users.findOne({
      where: { email: email },
    });
    return findOneEmailData;
  };

  //로그인
  findOnePassword = async (password) => {
    const findOnePassword = await Users.findOne({
      where: { password: password },
    });
    return findOnePassword;
  };
  // 마이페이지
  findOneUserInfo = async (userId) => {
    const findOneUserInfo = await Users.findOne({
      where: { userId: userId },
    });
    return findOneUserInfo;
  };
  findAllPost = async (userId) => {
    const findAllPost = await Posts.findAll({
      where: { userId },
    });
    findAllPost.sort((a, b) => b.createdAt - a.createdAt);
    return findAllPost;
  };
  findAllComment = async (userId) => {
    const findAllComment = await Comments.findAll({
      where: { userId },
    });
    findAllComment.sort((a, b) => b.createdAt - a.createdAt);
    return findAllComment;
  };
  //부적절한 댓글 신고

  //신고할 comment찾기
  findOneComment = async (commentId) => {
    const findOneComment = await Comments.findByPk(commentId);
    return findOneComment;
  };
  //신고 받은 댓글 삭제
  deleteComment = async (commentId) => {
    const deleteComment = await Comments.destroy({
      where: { commentId },
    });
  };
  //신고 받은 유저아이디 삭제
  deleteUser = async(commentId)=>{
    const banCommentId = await Comments.findByPk(commentId)
    const deleteUserId = await Users.findByPk(banCommentId.UserId)
    const deleteUser = await Users.destroy({
      where:{userId : deleteUserId.userId}
    })
  }


}
module.exports = UserRepository;
