import express from 'express';
import Post from '../models/Post.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/:post_id', async (req, res) => {
  const post = await Post.findOne({ shortId: req.params.post_id });
  const user = await User.findOne({ shortId: req.user.id });
  let cart = await Cart.findOne({ user, post }).populate('post');
  
  if (cart === null) {
    await Cart.create({
      user,
      post,
    });
  } else {
    await Cart.deleteOne({
      user,
      post,
    });
  }
  res.json({ isClick: cart === null });
});

// 찜 목록 리스트
router.get('/', async (req, res) => {
  const user = await User.findOne({ shortId: req.user.id });
  const cart = await Cart.findOne({ user: user }).populate('post');
  res.json({ cart: cart });
});

export default router;
