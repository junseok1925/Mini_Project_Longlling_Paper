const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    // 1-0) 로그인할때 발급받은 cookie가져오기
    const { authorization } = req.cookies;
    // 1-2) 가져온 cookie 분해
    const [tokenType, token] = (authorization ?? "").split(" ");
    if (!token || tokenType !== "Bearer") {
      return res.status(403).json({ errorMessage: "로그인필요한 기능(auth)" });
    }

    // 1-3) 디코드 작업
    const decodedToken = jwt.verify(token, "longlling-paper-key");
    const userId = decodedToken.userId;
    const user = await Users.findOne({ where: { userId } });
    res.locals.user = user;
    next();
  } catch (err) {
    res.clearCookie("authorization");
    return res.status(401).json({ errorMessage: "전달된 쿠키 오류임" });
  }
};