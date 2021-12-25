import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import store from '../passport/middlewares/multer.js';
import hashingPassword from '../utils/hash-password.js';
import { nanoid } from 'nanoid';
import getCurrentDate from '../utils/getTime.js';

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
    posts = await Post.find({
      location,
      category,
    });
    posts = JSON.stringify(posts);

    return res.render('home', {
      posts,
      userLocation: location,
      isCategory: true,
    });
  } else if (location && input) {
    posts = await Post.find({
      location,
      title: { $regex: input, $options: 'gi' },
    });

    return res.status(200).json({ posts, userLocation: location });
  } else if (location) {
    posts = await Post.find({
      location,
    });

    return res.status(200).json({ posts, userLocation: location });
  }
});

router.get('/new', (req, res) => res.render('./product/post'));
router.get('/edit', (req, res) => res.render('./product/postedit'));

//등록된 게시물 가져오기 (detail)
// localhost:3000/posts/:postId
router.get('/:post_id', async (req, res) => {
  const { post_id } = req.params;
  const post = await Post.findOne({ shortId: post_id }).populate('author');
  const user = await User.findOne({ shortId: req.user.id });
  const cart = await Cart.findOne({ user, post });
  const list = await Post.find({ author: post.author });
  const like = await Cart.countDocuments({ post: post._id });
  res.render('./product/detail', {
    post,
    list,
    isClick: cart !== null,
    like,
    user,
  });
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
    shortId: nanoid(),
  });

  res.redirect(`/posts/${post.shortId}`);
});

//게시물 삭제
//localhost:3000/post/:postId - delete
router.post('/:post_id/delete', async (req, res) => {
  await Post.findOneAndDelete({ shortId: req.params.post_id });

  res.redirect('/posts/');
});

router.get('/:post_id/edit', async (req, res) => {
  const post = await Post.findOne({ shortId: req.params.post_id });
  res.render('./product/postedit', { post });
});

router.post('/:post_id/edit', store.array('images'), async (req, res) => {
  const post = await Post.findOne({ shortId: req.params.post_id });
  console.log(req.files);
  const pathList = req.body.pathList ? req.body.pathList.split(',') : [];

  let images = req.files.length
    ? req.files.map(img => img.path.replace(/\\/g, '/'))
    : [];

  console.log('=======================images', images);
  console.log('=======================pathList', pathList);

  images = pathList.concat(images).slice(0, 5);

  console.log('=======================images', images);

  const price = req.body.price
    ? req.body.price.replace(' 원', '').replace(/,/gi, '')
    : '';

  const option = {
    ...req.body,
    images,
    thumbnail: images[0] ? images[0] : '',
    price,
    updatedAt: getCurrentDate(),
  };

  const asArray = Object.entries(option);
  const filtered = asArray.filter(
    ([key, value]) => value !== '' && value !== '1' && value !== [],
  );

  const filteredOpton = Object.fromEntries(filtered);
  console.log(filteredOpton);

  await Post.findOneAndUpdate({ shortId: req.params.post_id }, filteredOpton);

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
