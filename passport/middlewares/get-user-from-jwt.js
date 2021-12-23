import passport from 'passport';

export default (req, res, next) => {
  if (!req.cookies.token) {
    const url = req.url;
    if (
      url !== '/login' &&
      url !== '/' &&
      url !== '/signup' &&
      url !== '/find/id' &&
      url !== '/find/pwd'
    ) {
      if (url === '/auth') {
        next();
      } else {
        res.redirect('/login');
      }
    } else {
      next();
    }
  } else {
    const url = req.url;
    if (
      url === '/login' ||
      url === '/' ||
      url === '/signup' ||
      url === '/find/id' ||
      url !== '/find/pwd'
    ) {
      res.redirect('/posts');
    }
    return passport.authenticate('jwt', { session: false })(req, res, next);
  }
};
