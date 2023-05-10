const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const commentsRouter = require('./routes/comments.router');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   }),
// );
// const corsOptions = {
//   origin: true,
//   Credentials: true,
// };
// app.use(cors(corsOptions));

// app.use('/api', usersRouter);
// app.use('/api', postsRouter);
// app.use('/api', commentsRouter);


// const express = require('express');
// const path = require('path'); // 이 줄을 추가하세요.
// const cookieParser = require('cookie-parser');
// const usersRouter = require('./routes/users.router');
// const postsRouter = require('./routes/posts.router');
// const commentsRouter = require('./routes/comments.router');
// const cors = require('cors');

// const app = express();
// const PORT = 3013;

// app.use(
//   cors({
//     origin: 'http://localhost:3001',
//     credentials: true,
//   }),
// );

// app.use(express.json());
// app.use(cookieParser());
// app.use('/api', usersRouter);
// app.use('/api', postsRouter);
// app.use('/api', commentsRouter);

// // 정적 파일 제공 설정을 추가하세요.
// app.use(express.static("build"));


// 모든 요청을 허용할 경우
app.use(cors());

// 특정 도메인만 요청을 허용할 경우
// app.use(cors({
//   origin: 'https://kimchaeminthegreat.shop'
// }));



app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});