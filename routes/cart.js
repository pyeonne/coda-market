import express from 'express';
import Post from '../models/Post.js';
import Cart from '../models/Cart.js';

const router = express.Router();

const cartValidate = (filteredCart, cart) => {
  return filteredCart.length === cart.length;
};

router.post('/:post_id/cart', async (req, res) => {
  const post = await Post.findOne({ id: req.params.post_id });
  let cart = await Cart.findOne({ user_id: req.user.id }).populate('posts');
  const filteredCart = cart.posts.filter(item => item.id !== post.id);
  const isClick = cartValidate(filteredCart, cart.posts);

  if (cartValidate(filteredCart, user.cart)) {
    cart.posts.push(post);
    post.like_num += 1;
  } else {
    cart.posts = filteredCart;
    post.like_num -= 1;
  }

  await Post.updateOne(
    { id },
    {
      like_num: post.like_num,
    },
  );

  await Cart.updateOne(
    { user_id },
    {
      posts: cart.posts,
    },
  );

  res.status(200).json({ isClick });
});

// 찜 목록 리스트
router.get('/', async (req, res) => {
  const cart = await Cart.findOne({ user_id: req.user.id }).populate('posts');
  res.status(200).json({ cart: cart.posts });
});

export default router;
