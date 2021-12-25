import express from 'express';
import ChatRoom from '../models/ChatRoom.js';
import Message from '../models/Message.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const user = await User.findOne({ shortId: req.user.id });
  const rooms = await ChatRoom.find()
    .where('buyer')
    .exists(true)
    .where('seller')
    .exists(true)
    .or([{ buyer: user }, { seller: user }])
    .populate('post')
    .populate('buyer')
    .populate('seller')
    .sort({ updatedAt: 'desc' });
  const messages = [];
  for (let i = 0; i < rooms.length; i++) {
    messages.push(
      await Message.findOne({ chatroom: rooms[i] }).sort({ updatedAt: 'desc' }),
    );
  }

  res.render('./chat-list', {
    rooms: JSON.stringify(rooms),
    user,
    messages: JSON.stringify(messages),
  });
});

router.get('/:post_id', async (req, res) => {
  // 구매자와 판매자 개별 채팅창
  // const rooms = await ChatRoom.find;
  const post = await Post.findOne({ shortId: req.params.post_id }).populate(
    'author',
  );
  const chatroom = await ChatRoom.findOne({ post })
    .populate('buyer')
    .populate('seller');
  const user = await User.findOne({ shortId: req.user.id });
  res.render('./chat', { post, user, room: chatroom });
});

router.post('/:post_id', async (req, res) => {
  // 첫 채팅 주고 받을 떄 채팅창 만들기
  // 채팅 주고 받는 것을 DB에 저장하는 곳
  const user = await User.findOne({ shortId: req.user.id });
  const post = await Post.findOne({ shortId: req.params.post_id });
  const chatroom = await ChatRoom.findOne({ post });
  if (!chatroom) {
    await ChatRoom.create({
      post,
      buyer: user,
    });
  }
  res.redirect(`/chats/${post.shortId}`);
});

export default router;
