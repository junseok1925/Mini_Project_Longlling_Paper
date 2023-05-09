const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");
const commentsRouter = require("./routes/comments.router");
const cors = require("cors");

const app = express();
const PORT = 3013;

app.use(express.json());
app.use(cookieParser());
app.use('/api', usersRouter);
app.use('/api', postsRouter);
app.use('/api', commentsRouter);

// t수정수정ㅈ수정
app.options("*", cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
})