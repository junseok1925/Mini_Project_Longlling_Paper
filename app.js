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
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
}));



app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
})