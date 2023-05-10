# express, sequelize, mysql2 라이브러리를 설치합니다.
npm install express sequelize mysql2

# sequelize-cli, nodemon 라이브러리를 DevDependency로 설치합니다.
npm install -D sequelize-cli nodemon

# 설치한 sequelize를 초기화 하여, sequelize를 사용할 수 있는 구조를 생성합니다.
npx sequelize init 

# 가장 최근에 실행한 db:migrate를 취소합니다
npx sequelize db:migrate:undo

# migrations 폴더에 존재하는 migration 파일을 기반으로 테이블을 생성합니다.
npx sequelize db:migrate

# migration파일 기반 테이블 생성 오류시 ( 권한주입 )
chmod +x /Users/junseok/Documents/Mini_Project_Longlling_Paper/node_modules/.bin/sequelize

-- 테이블 데이터 삭제, 삭제 후 다시 migration파일 기반 테이블 생성해야함
DELETE FROM Comments;

