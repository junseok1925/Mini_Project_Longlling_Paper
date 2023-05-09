module.exports = {
  printWidth: 80, //  줄 바꿈 할 폭 길이
  tabWidth: 2, // 탭 너비
  singleQuote: true, //외따음표 설정여부  single 쿼테이션 사용 여부
  trailingComma: 'all', // 콤마는 언제 설정할건지 여러 줄을 사용할 때, 후행 콤마 사용 방식
  jsxBracketSameLine: false, // 이건 모르겠는데? JSX의 마지막 `>`를 다음 줄로 내릴지 여부
  prettify: 'prettier --write *.js **/*.js',
};
