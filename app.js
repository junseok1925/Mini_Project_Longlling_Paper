const express = require('express');
const path = require('path'); // 이 줄을 추가하세요.
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const commentsRouter = require('./routes/comments.router');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use('/api', usersRouter);
app.use('/api', postsRouter);
app.use('/api', commentsRouter);


// 정적 파일 제공 설정을 추가
app.use(express.static("build"));

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
