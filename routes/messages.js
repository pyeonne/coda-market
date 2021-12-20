import Message from '../models/Message.js';
import express from 'express';
import User from '../models/User.js';
import Conversation from '../models/Conversation.js';

const router = express.Router();

//메세지 보내기
router.post('/:conversation_id', async (req, res) => {
  const { text } = req.body;
  const { conversation_id } = req.params;
  const user = await User.findOne({ id: '123' }); //req.user.user_id
  const io = req.app.get('socketio');

  try {
    //socket io 통신
    const newMessage = await Message.create({
      text,
      conversationId: conversation_id,
      sender: user,
    });

    //대화창에서 마지막 문장 업데이트
    await Conversation.findOneAndUpdate(
      { id: conversation_id },
      { lastSentence: text },
      { new: true },
    );

    res.status(200).json({ newMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//지금까지의 메시지 기록보기
router.get('/:conversation_id', async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversation_id,
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
