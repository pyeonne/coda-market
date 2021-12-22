import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

//홈화면에서 updatedAt 순으로 게시물 나열
router.post('/', async (req, res) => {
  const { input } = req.body;
  const posts = await Post.find({
    $and: [
      // { location: req.user.location },
      { title: { $regex: `${input}`, $options: 'i' } },
    ],
  });
  res.status(200).json({ posts });
});

//loaclhost:3000 - get
router.get('/detail', (req, res) => res.render('./product/detail'));

router.get('/login', (req, res) => {
  res.render('./account/login');
});

router.get('/mypage', (req, res) => res.render('./profile'));

router.get('/chat', (req, res) => res.render('./chat-list'));

router.get('/', (req, res) => {
  res.render('./first');
});

router.post('/logout', (req, res) => {
  res.cookie('token', null, { maxAge: 0 }).redirect('/login');
});

router.get('/category', (req, res) => res.render('./category'));

// router.get('/search', async (req, res) => {
//   const { input, location } = req.query;
//   let posts;

//   if (input !== undefined) {
//     posts = await Post.find({ title: { $regex: input, $options: 'gi' } });
//   }

//   if (location !== undefined) {
//     posts = await Post.find({ location: { $regex: location, $options: 'gi' } });
//   }

//   posts = await Post.find({
//     title: { $regex: input, $options: 'gi' },
//     location,
//   });

//   res.status(200).json({ posts });
// });

export default router;
