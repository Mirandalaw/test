const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('SUC');
});
router.get('/signUp', (req, res) => {
  res.render('signUp');
});
router.post('/signUp', (req, res) => {});
// 로그인 폼이 있는 페이지는 GET 방식으로 요청 응답 : login 페이지에 대한 응답일 뿐 로그인 정보를 주는 것이 아님
// 로그인 정보를 넘겨주고 서버는 그에 대한 응답을 할 때에는 POST를 사용
// 정보를 작성하는 동작과 정보를 전달하는 동작을 구분할 줄 알아야함
router.get('/login', (req, res) => {
  res.render('login');
});

// 로그인 정보를 받아 처리하는 액션 지정해주기 (라우팅)
router.post('/login', (req, res) => {
  console.log(req.body);
  // req(요청 객체 : 요청 정보가 담김)의 속성 중 body(객체 형태)에 3번 항목 form 내부 로그인 정보가 담겨있음
  // req.body.user_id,req.body.user_pwd로 추출하면 됨 : req.body.input 태그에 내가 지정한 태그 name 속성의 값
  // 위와 같이 받은 정보를 db에 담겨져있는 아이디, 비밀번호와 비교한 후 결과를 응답해주면 됨

  const id = req.body.user_id;
  const pwd = req.body.user_pwd;

  res.redirect('/');
  // res.redirect() : 넘길 페이지 파일을 정할 때 사용하는 res 객체 메소드, 로그인 성공/실패 따라 redirect 페이지를 달리할 때 사용
});

module.exports = router;
