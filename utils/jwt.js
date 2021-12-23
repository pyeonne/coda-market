import jwt from 'jsonwebtoken';
const secret = 'coda';

const setUserToken = (res, user) => {
  const token = jwt.sign(user, secret);
  res.cookie('token', token);
};

export { secret, setUserToken };
