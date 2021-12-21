import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
import store from '../passport/middlewares/multer.js';

const router = express.Router();

//localhost:3000/posts/search?title=
router.get('/search', async (req, res) => {
  const { title } = req.query;

  const posts = await Post.find({
    location: req.user.location,
    title,
  });
  res.render('./home.ejs', { posts });
});

//localhost:3000/posts/category?category=
router.get('/category', async (req, res) => {
  const { category } = req.query;

  const posts = await Post.find({
    category,
  });

  // $and: [{ location: req.user.location }, { category }],
  res.render('./home.ejs', { posts });
});

//등록된 게시물 가져오기 (detail)
// localhost:3000/posts/:postId
router.get('/:post_id', async (req, res) => {
  const { post_id } = req.params;
  const post = await Post.findOne({ shortId: post_id }).populate('author');

  res.json({ post });
});

//게시물 생성
// localhost:3000/post -post
router.post('/new', store.array('images', 5), async (req, res, next) => {
  const { title, content, location, category, price } = req.body;
  const files = req.files;
  if (!files) {
    const err = new Error('선택된 파일이 없습니다.');
    return next(err);
  }

  const imageArray = files.map(file => file.path);
  const user = await User.findOne({ shortId: req.user.id });

  const post = await Post.create({
    image: imageArray,
    title,
    content,
    location: user.location,
    category,
    price: Number(price),
    author: user,
    thumbnail: imageArray[0],
  });

  res.render('./product/detail', post);
});

//게시물 삭제
//localhost:3000/post/:postId - delete
router.delete('/:post_id', async (req, res) => {
  //게시물 아이디
  const { post_id } = req.params;
  //작성자인지 인증 필요

  const post = await Post.updateOne(
    { shortId: post_id },
    {
      current_status: 'deleted',
    },
  );

  res.json({ post });
  res.redirect('http://localhost:3000/');
});

//게시물 업데이트
//localhost:3000/post/:postId - patch
router.post('/:post_id', async (req, res) => {
  const { post_id } = req.params;

  const post = await Post.findOneAndUpdate({ shortId: post_id }, req.body, {
    new: true,
    upsert: true,
    timestamps: { createdAt: false, updatedAt: true },
  });

  res.redirect(`/${post_id}`);
});

//판매완료 후 게시물 업데이트
router.patch('/:post_id/soldout', async (req, res) => {
  const {
    params: { post_id },
    query: { state },
  } = req;

  const post = await Post.findOneAndUpdate(
    { shortId: post_id },
    { isSoldOut: !Boolean(state) },
    {
      new: true,
      upsert: true,
      timestamps: { createdAt: false, updatedAt: true },
    },
  );

  res.json({ post });
});

export default router;
