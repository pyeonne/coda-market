import passport from 'passport';

export default (req, res, next) => {
  if (!req.cookies.token) {
    next(); // 에러처리로 로그인 할 수 있게 만들기
    return;
  }

  return passport.authenticate('jwt', { session: false })(req, res, next);
};
