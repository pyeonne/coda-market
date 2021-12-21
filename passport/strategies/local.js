import passportLocal from 'passport-local';
import User from '../../models/User.js';
import hashPassword from '../../utils/hash-password.js';
const LocalStrategy = passportLocal.Strategy;

const config = {
  usernameField: 'id',
  passwordField: 'password',
};

const local = new LocalStrategy(config, async (id, password, done) => {
  console.log(id, password);
  const user = await User.findOne({ shortId: id });
  let loginFailed = false;

  if (!user) {
    done(null, {
      loginFailed: true,
    });
  } else {
    console.log(user);
    if (user.password !== hashPassword(password)) {
      loginFailed = true;
    }
    done(null, {
      id,
      name: user.name,
      loginFailed,
    });
  }
});

export default local;
