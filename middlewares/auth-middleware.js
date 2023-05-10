const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const {
  createAccessToken,
  validAccessToken,
  validRefreshToken,
} = require('./token');

const SECRET_KEY = 'longlling-paper-key';

module.exports = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  // null 병합 문자열 : 왼쪽의 값이 비었거나 null일 경우 오른쪽 값으로 대치해준다
  // -> 기존엔 Bearer인증을 사용해서 토큰을 전달 받았지만, 이제는 cookie를 사용해서 accToken과 refToken을 전달 받기때문에 필요없다
  // const [authType, authToken] = (Authorization ?? "").split(" ");

  // 엑세스 토큰과 리프레시 토큰이 모두 존재하고 있는지 확 즉,없으면 로그인상태가 아님
  if (!accessToken || !refreshToken) {
    res.status(403).json({
      errorMessage: '로그인이 필요한 기능입니다.',
    });
    return; // 다음 코드로 진행을 막는다
  }

  // accessToken이 유효하지 않으면, refreshToken에 저장된 사용자 userId를 이용해 새로운 accessToken 생성해주기
  if (!validAccessToken(accessToken)) {
    const { userId } = jwt.verify(refreshToken, 'longlling-paper-key');
    const newAccessToken = createAccessToken(userId);
    res.cookie('accessToken', newAccessToken);
  }

  // 리프레시 토큰이 유효한지 확인
  if (!validRefreshToken(refreshToken)) {
    res.status(419).json({
      errorMessage: 'Refresh Token이 만료되었습니다.',
    });
    return;
  }

  try {
    const { userId } = jwt.verify(accessToken, SECRET_KEY);
    const user = await Users.findOne({ where: { userId } });
    if (!user) {
      throw new Error();
    }
    res.locals.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({
      errorMessage: '전달된 Token에 오류가 있습니다.',
    });
    return;
  }
};
