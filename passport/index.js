import passport from 'passport';
import local from './strategies/local.js';
import jwt from './strategies/jwt.js';

export default () => {
  passport.use(local);
  passport.use(jwt);
};
