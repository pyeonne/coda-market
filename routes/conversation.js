import Conversation from '../models/Conversation.js';
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

//새로운 대화창 생성.
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const seller = await User.findOne({
    shortId: user_id,
  });

  const buyer = await User.findOne({
    shortId: '123',
  });

  try {
    //socket io 통신
    let io = req.app.get('socketio');
    io.sockets.emit('messsage', user_id);

    console.log(io.sockets.emit('messsage', user_id)); // true

    io.on('connection', socket => {
      console.log(123123);
      console.log('welecom this is socket server');
      io.emit('welecom this is socket server ');
    });

    const newConversation = await Conversation.create({
      members: [seller, buyer],
    });

    res.json({ newConversation });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// 생성된 모든 대화창 데이터 가져오기
router.get('/1', async (req, res) => {
  try {
    const user = await User.find({ shortId: '123' });
    const conversation = await Conversation.find({
      members: { $in: user },
    }).populate('members');
    res.json({ conversation });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
