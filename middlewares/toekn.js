const jwt = require("jsonwebtoken");
const SECRET_KEY = "longlling-paper-key";
const tokenObject = {}; // Refresh Token을 저장할 Object
// userId를 매개변수로 받아 새로운 accessToken와 refreshToken을 생성
// 반환된 변수들은 로그인 및 인증 과정에서 쿠키에 저장되어 클라이언트와 서버 간의 인증에 활용
function setToken(userId) {
  const accessToken = createAccessToken(userId);
  const refreshToken = createRefreshToken();
  tokenObject[refreshToken] = userId; // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장합니다.
  return { accessToken, refreshToken };
}
// 해당 함수는 userId를 인자로 받아 JWT(access token)를 생성하는 함수
// 생성된 JWT에는 userId가 저장되고 만료시간을 지정
// 2h 뒤 만료
function createAccessToken(userId) {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "2h" });
}
// 빈 객체 {}를 SECRET_KEY를 이용해 JSON Web Token으로 변환
// 7일뒤 만료
function createRefreshToken() {
  return jwt.sign({}, SECRET_KEY, { expiresIn: "7d" }); // Refresh Token 7일뒤 만료
}
// accessToken이 유효한지 검사하기
function validAccessToken(accessToken) {
  try {
    jwt.verify(accessToken, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}
//refreshToken이 유효한지 검사하기
function validRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}
module.exports = {
  setToken,
  createAccessToken,
  createRefreshToken,
  validAccessToken,
  validRefreshToken,
};
// 정리
// 1. setToken 함수가 실행.
// 2. userId를 인자로 받아서 createAccessToken 함수와 createRefreshToken 함수를 호출한다.
// 3. createAccessToken 함수는 userId를 이용해 accessToken을 생성하고, expiresIn 옵션을 이용해 만료시간을 10초로 설정된다.
// 4. createRefreshToken 함수는 빈 객체 {}를 이용해 refreshToken을 생성하고, expiresIn 옵션을 이용해 만료시간을 7일로 설정된다.
// 5. setToken 함수는 생성된 accessToken과 refreshToken을 반환, refreshToken을 서버에 저장하기 위해 tokenObject[refreshToken] = userId 코드를 실행한다.