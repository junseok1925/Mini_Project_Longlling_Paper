const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const commentsRouter = require('./routes/comments.router');
// const cors = require('cors');



const app = express();
const PORT = 3013;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // 클라이언트 주소
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 허용되는 메서드
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // 요청 헤더
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use('/api', usersRouter);
app.use('/api', postsRouter);
app.use('/api', commentsRouter);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
