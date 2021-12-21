import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

//홈화면에서 updatedAt 순으로 게시물 나열
//loaclhost:3000 - get
router.get('/', async (req, res) => {
  const posts = await Post.find({}).sort({ updatedAt: 'desc' }).exec();
  res.render('./home', { posts });
});

router.get('/first', (req, res) => {
  res.render('./first');
});

router.get('/search', async (req, res) => {
  const { input } = req.query;
  const posts = await Post.find({ title: { $regex: input, $options: 'gi' } });

  res.render('./home', { posts });
});

export default router;
