import express from 'express';
import User from '../models/User.js';
import getHash from '../utils/hash-password.js';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('./account/signup');
});

router.post('/', async (req, res) => {
  const { location, id, pwd, name, email } = req.body;

  const idCheck = await User.findOne({ shortId: id });
  const emailCheck = await User.findOne({ email });
  if (id !== undefined && idCheck === null && 
    email !== undefined && emailCheck === null) {
    await User.create({
      shortId: id,
      password: getHash(pwd),
      name,
      location,
      email,
    });
  
    res.redirect('/login');
    return;
  }

  if (id !== undefined && idCheck === null) {
    res.json({ existedUserId: false });
  }

  if (id === undefined && emailCheck === null) {
    res.json({existedUserEmail: false});
  }
  
  if (email === undefined && idCheck !== null) {
    res.json({existedUserId: true});
  }

  if (email !== undefined && emailCheck !== null) {
    res.json({existedUserEmail: true});
  }

});

export default router;
