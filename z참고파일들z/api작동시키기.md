### 회원가입
[post] localhost:3000/api/signup

ex
{
  "email":"Teemo@naver.com",
  "nickname":"캡틴티모",
  "password": "1234"
}

### 로그인
[post] localhost:3000/api/login
<body>
{
  "email":"Teemo@naver.com",
  "password": "1234"
}

### 롱링페이퍼 생성
[post] localhost:3000/api/posts
<body>
{
  "title":"롱링페이퍼제목3",
  "content":"내 롱링페이퍼 한줄 소개3"
}

### 롱링페이퍼 수정
#### postId = 수정한 롱링페이퍼의 postId
[put] localhost:3000/api/posts/:postId
<body>
{
  "title":"수정할 제목1",
  "content":"수정할 한줄 소개1"
}

### 롱링페이퍼 삭제
#### postId = 수정한 롱링페이퍼의 postId
[delete] localhost:3000/api/posts/:postId

### 마이페이지
[GET] localhost:3000/api/users


### 댓글추가
[post] localhost:3000/api/posts/1/comments

<body>
{
  "comment":"1번 게시물에 1번댓글"
}

### 댓글 조회
#### postId = 롱링페이퍼의 postId
[get] localhost:3000/api/posts/:postId/comments

### 댓글 신고
#### commentId = 신고할 댓글 commentId
[post] localhost:3000/api/comments/:commentId/report



