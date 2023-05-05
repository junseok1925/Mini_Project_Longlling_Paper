const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Users, Comments } = require("../models");

// ================================================ 회원가입 api ================================================
router.post("/signup", async (req, res) => {
  try {
    const { nickname, password, email } = req.body;
    const isExistUser = await Users.findOne({ where: { nickname } });

    // #412 nickname, email, password를 입력하지 않을 경우
    if (!nickname) {
      return res.status(412).json({
        errorMessage: "닉네임을 입력해주세요.",
      });
    }
    if (!email) {
      return res.status(412).json({
        errorMessage: "이메일을 입력해주세요.",
      });
    }
    if (!password) {
      return res.status(412).json({
        errorMessage: "비밀번호을 입력해주세요.",
      });
    }

    // #412 nickname이 중복된 경우
    if (isExistUser) {
      return res.status(412).json({
        errorMessage: "중복된 닉네임입니다.",
      });
    }

    const user = await Users.create({ nickname, email, password });
    await user.save();

    res.status(201).json({ message: "회원가입에 성공했습니다." });

    // #400 예외 케이스에서 처리하지 못한 에러
  } catch (error) {
    console.error(error);
    res.status(400).json({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

//================================ 로그인 API //================================
// 로그인이면 유저정보를 가져와 해야하니 GET으로 하는게 맞지않는가?
// -> GET메서드로 보내는 API는 모두 주소에 해당하는 데이터가 노출이 되는 문재가 발생할 수 있다.
// 그리고 인증정보 (JWT)를 생성해서 보낸다는 내용이기 때문에 POST가 더 적합.

router.post("/login", async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const user = await Users.findOne({ where: { nickname } });

    // #412 해당하는 유저가 존재하지 않는 경우
    // nickname과 password 예외처리를 묶어서 한번에 하는 이유
    // -> nickname과 password를 따로 예외처리를 하면 해킹 당할 확률이 높기 때문, 둘 중 무엇이 오류인지 알려주지않음
    if (!user || user.password !== password) {
      res.status(412).json({
        errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
      });
      return;
    }
    // JWT 생성하기
    const token = jwt.sign(
      { nickname: user.nickname, userId: user.userId },
      "longlling-paper-key" // auth-middleware.js에서 설정한 비밀키
    );
    res.cookie("Authorization", `Bearer ${token}`);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      errorMessage: "로그인에 실패하였습니다.",
    });
  }
});

//================================ 부적절한 댓글 신고 api ================================

// 댓글 신고 API
router.post("/comments/:commentId/report", async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comments.findOne({ where: { commentId } });

    if (!comment) {
      return res.status(404).json({ errorMessage: "댓글을 찾을 수 없습니다." });
    }

    // 신고 횟수를 증가시키고 저장
    comment.banCount += 1;
    await comment.save();

    // 신고 횟수가 3회 이상이면 유저데이터 삭제 ( 강제 탈퇴 )
    // 만약 신고 버튼을 연달아 3번 누르면? -> 억울하게 강제탈퇴의 가능성 -> 한 유저당 한번씩만 해당 댓글 신고 가능하게?
    // 연달아 3번 누르면 자동으로 유저데이터삭제 -> 그 사실을 모르는 유저는 로그인이 왜 안될까 생각 -> 같은 정보로 다시 회원가입? -> 해당 유저의 이메일주소를 이메일 유효성 검사에서 걸리게끔 자동으로 추가해주는 api ? 그럼 banEmail테이블을 만들어서 해당 정보를 뺴와서 다시 가져오기?
    // 댓글 남길때 유효성 검사를 진행 하는것도 나쁘지않음 -> "멍청이" 같은 정확한 욕설은 거를 수 있지만 "몽총이" 같은 욕설은 필터링이 불가능...
    // 신고를 당한 댓글 목록만 보여주는 api를 짜서 관리자가 확인 후 처리하는 방법도 나쁘지 않을까...?( 신고자정보, 신고당한 댓글내용, 댓글 작성자를 가져옴 )
    
    if (comment.banCount >= 3) {
      await Users.destroy({ where: { userId: comment.userId } });
      res.status(200).json({ message: "댓글 작성자가 강제탈퇴되었습니다." });
    } else {
      res.status(200).json({ message: "댓글 신고가 접수 되었습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      errorMessage: "댓글 신고에 실패하였습니다.",
    });
  }
});

module.exports = router;

module.exports = router;
