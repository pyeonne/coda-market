import express from 'express';
import User from '../models/User.js';
import asyncHandler from '../utils/async-handler.js';
import getHash from '../utils/hash-password.js';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('./account/signup');
});

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { location, id, pwd, name, email } = req.body;
    const user = await User.create({
      shortId: id,
      password: getHash(pwd),
      name,
      location,
      email,
    });

    res.render('./account/login');
  }),
);

export default router;
