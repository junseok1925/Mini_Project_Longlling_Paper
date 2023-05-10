# ================ 프론트 프젝, 백엔드 프젝을 합쳐서 사용하기 -================

# 백엔드 터미널에서 npm 설치
npm init -y
npm install
npm install express
npm install sequelize
npm install mysql2
# 프론트 터미널에서 npm 설치
npm install

# 3가지 설치 후 잘 작동되는지 확인하기
node app
-> 백엔드 프젝 실행 (app.js로 실행한다는 뜻), "3000번 포트가 실행되엇습니다!" 라고 뜸
**위에 3가지 npm설치 후 node app 실행했는데 성공 메세지 안뜨면 문의**

# build파일 생성 
npm run build 
-> 프론트 프젝 터미널에서 명령어 입력build 폴더 생성 (프론트 프젝안에 맨위에 생성됨...터미널에 다 생성됬다고 뜰때까지 기다리기)
**만약 터미널에서 build파일 생성 오류가 생기면 수정한 부분에서 오류가 있는 것(오타나 잘못된 부분이 있는지 확인)**

# build생성 자동화
프론트엔드에서 백엔드의 build 폴더로 빌드: 
프론트엔드의 빌드 명령을 수정하여 프론트엔드 빌드 파일이 바로 백엔드의 build 폴더로 생성되게 했다.
예를 들어, React 프로젝트에서는 package.json의 "scripts" 섹션에 있는 "build" 명령을 수정하여 빌드 결과물이 백엔드의 build 폴더로 이동하게 하게 한다.

ex: "build": "react-scripts build && mv build ../backend프젝/build"

### 프론트프젝/package.json 파일에...
  "scripts": {
    ...
    "build": "react-scripts build && mv build ../Mini_Project_Longlling_Paper/build",
  },

  라고 build 명령을 수정

  -> 결과적으로 프론트프젝 터미널에서 npm run build 명령어 입력시 백엔드프젝 안에 자동으로 build파일 생성
  -> 원래는 기존의 build파일이 백엔드프젝에 존재하고, 프론트프젝의 수정사항을 저장 후 새로운 build파일을 생성하면 자동으로 백엔드의 build폴더가 최신화가 될 줄 알았지만 최신화가 안됨...
  -> **기존의 백엔드프젝의 build파일을 삭제 후 프론트프젝에서 npm run build를 해야함**

  # 과정을 정리하자면
  1. 프론트에서 수정사항이 생김
  2. 백엔드 서버 종료, build파일 삭제
  3. 프론트에서 npm run build로 build 생성
  4. 자동으로 백엔드에도 build파일 생성됨
  5. 백엔드에서 node app 으로 서버 실행
   