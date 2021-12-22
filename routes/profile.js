import express from 'express';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import Post from '../models/Post.js';
import store from '../passport/middlewares/multer.js';
import hashingPassword from '../utils/hash-password.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { postId } = req.query;
  const loginedUser = await User.findOne({ shortId: req.user.shortId });
  if (postId === undefined) {
    res.render('./profile', { loginedUser, isOwner: true });
  } else {
    const post = await Post.findOne({ shortId: postId }).populate('author');
    const postedUser = await User.findOne({ shortId: post.author.shortId });
    if (postedUser === loginedUser) {
      const user = await User.findOne({ shortId: req.user.id });
      res.render('./profile', { postedUser, isOwner: true });
    } else {
      res.render('./profile', { postedUser, isOwner: false });
    }
  }
});

router.get('/edit', async (req, res) => {
  const user = await User.findOne({ shortId: req.user.id });
  res.render('./profile-edit', { user });
});

router.post('/password-check', async (req, res) => {
  const user = await User.findOne({ name: req.user.name });

  console.log(user.password === hashingPassword(req.body.password));

  if (user.password === hashingPassword(req.body.password)) {
    res.redirect('/profile/edit', { user });
  } else {
    res.redirect('/profile', { user });
  }
});

router.post('/edit', store.single('image'), async (req, res) => {
  const { name, pwd, location } = req.body;

  const thumbnail = req.file.path.replace(/\\/g, '/');

  const password = hashingPassword(pwd);
  const user = await User.findOneAndUpdate(
    { shortId: req.user.id },
    {
      name,
      password,
      location,
      thumbnail,
    },
  );

  res.redirect('./profile', { name: user.name });
});

router.get('/tranactions', async (req, res) => {
  const user = await User.findOne({ shortId: req.user.id });
  const posts = await Post.find({ author: user });

  res.json({ list: posts });
});

router.get('/purchases', async (req, res) => {
  const user = await User.findOne({ shortId: req.user.id });
  const posts = await Post.find({ purchased_user: user });
  res.json({ list: posts });
});

router.get('/carts', async (req, res) => {
  const user = await User.findOne({ shortId: req.user.id });
  const cart = await Cart.find({ user }).populate('post');
  res.json({ list: cart });
});

// router.get('/:nickname', async (req, res) => {
//   // 쿼리파라미터로 하자! (postId, name 넘겨달라하기 => 그냥 profile로 합치기)
//   if (req.user.name !== req.params.nickname) {
//     res.render('./profile', { isOwner: false });
//   } else {
//     res.render('./profile', { isOwner: true });
//   }
// });

export default router;
