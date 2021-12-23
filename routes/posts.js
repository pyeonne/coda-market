import { render } from 'ejs';
import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
import store from '../passport/middlewares/multer.js';
import hashingPassword from '../utils/hash-password.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const user = await User.findOne({ shortId: req.user.id });
  let posts = await Post.find({}).sort({ updatedAt: 'desc' });
  posts = JSON.stringify(posts);

  res.render('home', { posts, userLocation: user.location, isCategory: false });
});

router.get('/search', async (req, res) => {
  const { location, category, input } = req.query;
  let posts;

  if (location && category) {
    console.log('location && category');

    posts = await Post.find({
      location,
      category,
    });
    posts = JSON.stringify(posts);

    res.render('home', {
      posts,
      userLocation: location,
      isCategory: true,
    });
  } else if (location && input) {
    console.log('location && input');

    posts = await Post.find({
      location,
      title: { $regex: input, $options: 'gi' },
    });

    res.status(200).json({ posts, userLocation: location });
  } else if (location) {
    console.log('location');

    posts = await Post.find({
      location,
    });

    res.status(200).json({ posts, userLocation: location });
  }
});

router.get('/new', (req, res) => res.render('./product/post'));
router.get('/edit', (req, res) => res.render('./product/postedit'));

//등록된 게시물 가져오기 (detail)
// localhost:3000/posts/:postId
router.get('/:post_id', async (req, res) => {
  const { post_id } = req.params;
  const post = await Post.findOne({ shortId: post_id }).populate('author');
  const list = await Post.find({ author: post.author });

  res.render('./product/detail', { post, list });
});

//게시물 생성
// localhost:3000/post -post
router.post('/new', store.array('images', 5), async (req, res, next) => {
  const { title, content, location, category, price } = req.body;
  const files = req.files;

  // if (!files) {
  //   const err = new Error('선택된 파일이 없습니다.');
  //   return next(err);
  // }

  const imageArray = files.map(file => file.path.replace(/\\/g, '/'));
  const user = await User.findOne({ shortId: req.user.id });
  const post = await Post.create({
    images: imageArray,
    title,
    content,
    location: user.location,
    category,
    price: price.replace(' 원', '').replace(/,/gi, ''),
    author: user,
    thumbnail: imageArray[0],
  });

  console.log(post);

  res.redirect(`/posts/${post.shortId}`);
});

//게시물 삭제
//localhost:3000/post/:postId - delete
router.post('/:post_id/delete', async (req, res) => {
  //게시물 아이디
  const { post_id } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ shortId: req.user.id });

  // if (password === hashingPassword(user.password)) {
  //   await Post.findOneAndUpdate(
  //     { shortId: post_id },
  //     {
  //       current_status: 'deleted',
  //     },
  //   );
  //   res.redirect('http://localhost:3000/');
  // } else {
  //   throw new Error('비밀번호가 맞지 않습니다.');
  // }

  res.redirect('/posts/');
});

//게시물 업데이트
//localhost:3000/post/:postId - patch

// router.get('/:post_id/edit', async (req, res) => {
//   const { post_id } = req.params;

//   const post = await Post.findOneAndUpdate({ id: post_id }, req.body, {
//     new: true,
//     upsert: true,
//     timestamps: { createdAt: false, updatedAt: true },
//   });

//   res.render('./product/postedit', { mypost : post });
// });

// front update test

router.get('/:post_id/edit', async (req, res) => {
  const post = await Post.findOne({ shortId: req.params.post_id });
  res.render('./product/postedit', { post });
});

router.post('/:post_id/edit', async (req, res) => {
  const post = await Post.findOne({ shortId: req.params.post_id });

  const thumbnail = req.file ? req.file.path.replace(/\\/g, '/') : '';

  await Post.findOneAndUpdate(
    { shortId: req.params.post_id },
    {
      ...req.body,
      thumbnail,
      price: req.body.price.replace(' 원', '').replace(',', ''),
      timestamps: { createdAt: false, updatedAt: true },
    },
  );

  res.redirect(`/posts/${post.shortId}`);
});

//판매완료 후 게시물 업데이트
router.post('/:post_id/soldout?state', async (req, res) => {
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
