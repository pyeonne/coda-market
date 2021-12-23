import passportJwt from 'passport-jwt';
import { secret } from '../../utils/jwt.js';

const JwtStrategy = passportJwt.Strategy;

const cookieExtractor = req => {
  const { token } = req.cookies;
  return token;
};

const opts = {
  secretOrKey: secret,
  jwtFromRequest: cookieExtractor,
};

export default new JwtStrategy(opts, (user, done) => {
  done(null, user);
});
