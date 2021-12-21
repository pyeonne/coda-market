import express from 'express';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import Post from '../models/Post.js';
import store from '../passport/middlewares/multer.js';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('./mypage');
});

router.get('/edit', async (req, res) => {
  const user = await User.findOne({ id: req.user.id });
  res.render('./profile', { name: req.user.name, location: user.location });
});

router.post('/edit', store.single('image'), async (req, res) => {
  const { name, location, pwd } = req.body;

  console.log(req.body);
  const user = await User.findOneAndUpdate(
    { id: req.user.id },
    {
      name,
      location,
      pwd,
    },
  );
  console.log(req.file);
  res.render('./mypage', { name: user.name });
});

router.get('/logout', (req, res) => {
  res.cookie('token', null, { maxAge: 0 }).render('./first');
});

router.get('/tranaction-list', async (req, res) => {
  const user = await User.findOne({ id: req.user.id });
  const posts = await Post.find({ author: user }).populate('author');
  const list = await res.status(200).json({ list: posts });
});

router.get('/purchased-list', async (req, res) => {
  const posts = await Post.find({ purchased_user: req.user.id });
  res.status(200).json({ list: posts });
});

router.get('/cart-list', async (req, res) => {
  const cart = await Cart.find({ user_id: req.user.id }).populate('posts');
  res.status(200).json({ list: cart.posts });
});

router.get('/:nickname', (req, res) => {
  if (req.user.name !== req.params.nickname) {
    res.render('./mypage', { isOwner: false });
  } else {
    res.render('./mypage');
  }
});

export default router;
