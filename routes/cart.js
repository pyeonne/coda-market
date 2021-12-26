import express from 'express';
import Post from '../models/Post.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/:post_id', async (req, res) => {
  const post = await Post.findOne({ shortId: req.params.post_id });
  const user = await User.findOne({ shortId: req.user.id });
  const cart = await Cart.findOne({ user, post });

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
});

export default router;
