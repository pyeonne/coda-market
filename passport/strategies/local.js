import passportLocal from 'passport-local';
import User from '../../models/User.js';
import hashPassword from '../../utils/hash-password.js';
const LocalStrategy = passportLocal.Strategy;

const config = {
  usernameField: 'id',
  passwordField: 'password',
};

const local = new LocalStrategy(config, async (id, password, done) => {
  const user = await User.findOne({ id });

  let loginFailed = false

  if (!user) {
    done(null, {
      loginFailed: true,
    });
  } else {
    if (user.pwd !== hashPassword(password)) {
      loginFailed = true;
    }
    done(null, {
      id: id,
      name: user.name,
      loginFailed,
    });
  }
});

export default local;
