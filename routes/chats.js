import express from 'express';
import ChatRoom from '../models/ChatRoom';
import Post from '../models/Post';
import User from '../models/User';

const router = express.Router();

router.get('/', async (req, res) => {
  const user = await User.findOne({ shortId: req.user.id });
  const rooms = await ChatRoom.find()
    .or([{ buyer: user }, { seller: user }])
    .sort({ updatedAt: 'desc' });
  res.render('./chat-list');
});

router.get('/:post_id', async (req, res) => {
  // 구매자와 판매자 개별 채팅창
  // const rooms = await ChatRoom.find;
  const post = await Post.findOne({ shortId: req.params.post_id });
  const user = await user.findeOne({ shortId: req.user.id });
  // res.render('') -> 머지하고 확인하면 됌
});

router.post('/:post_id', async (req, res) => {
  // 첫 채팅 주고 받을 떄 채팅창 만들기
  // 채팅 주고 받는 것을 DB에 저장하는 곳
  const user = await User.findOne({ shortId: req.user.id });
  const post = await Post.findOne({ shortId: req.params.post_id });
  await ChatRoom.create({
    post,
    buyer: user,
  });
  res.redirect(`/chats/${post.shortId}`);
});

export default router;
