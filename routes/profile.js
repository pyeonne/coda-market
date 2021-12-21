import express from 'express';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import Post from '../models/Post.js';
import store from '../passport/middlewares/multer.js';
import passport from 'passport';
import hashingPassword from '../utils/hash-password.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('./profile', { name: req.user.name });
});

router.get('/edit', async (req, res) => {
  const user = await User.findOne({ shortId: req.user.id });
  res.render('./profile-edit');
});

router.post('/password-check', async (req, res) => {
  const user = await User({ name: req.user.name });

  if (user.password === hashingPassword(req.body.password)) {
    res.json({ passwordCheck: true });
  } else {
    res.json({ passwordCheck: false });
  }
});

router.post('/edit', store.single('image'), async (req, res) => {
  const { name, pwd, location } = req.body;
  const thumbnail = req.file.path;

  const user = await User.findOneAndUpdate(
    { shortId: req.user.id },
    {
      name,
      password: pwd,
      location,
      thumbnail,
    },
  );

  res.render('./mypage', { name: user.name });
});

router.get('/tranactions', async (req, res) => {
  const user = await User.findOne({ shortId: req.user.id });
  const posts = await Post.find({ author: user }).populate('author');

  res.json({ list: posts });
});

router.get('/purchases', async (req, res) => {
  const user = req.user.id;
  const posts = await Post.find({ purchased_user: user });
  res.json({ list: posts });
});

router.get('/carts', async (req, res) => {
  const cart = await Cart.find({ user: req.user.id }).populate('posts');
  res.json({ list: cart.posts });
});

router.get('/:nickname', (req, res) => {
  if (req.user.name !== req.params.nickname) {
    res.render('./mypage', { isOwner: false });
  } else {
    res.render('./mypage');
  }
});

export default router;
