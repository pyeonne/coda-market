import express from 'express';
import User from '../models/User.js';
import asyncHandler from '../utils/async-handler.js';
import getHash from '../utils/hash-password.js';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('./account/signup');
});

router.post('/', async (req, res) => {
  const { location, id, pwd, name, email } = req.body;
  let user = await User.find({ shortId: id });
  if (id !== undefined && user.length !== 0) {
    res.json({ existingUserId: true });
  }

  user = await User.find({ email });
  if (email !== undefined && user.length !== 0) {
    res.json({ existingUserEmail: true });
  }

  await User.create({
    shortId: id,
    password: getHash(pwd),
    name,
    location,
    email,
  });

  res.redirect('/login');
});

export default router;
