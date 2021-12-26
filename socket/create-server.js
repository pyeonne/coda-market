import { Server } from 'socket.io';
import ChatRoom from '../models/ChatRoom.js';
import formatMessage from './utils.js';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Message from '../models/Message.js';
import moment from 'moment';

export default server => {
  const io = new Server(server, { credentials: true });
  async function initMessages(socket, chatroom) {
    const messages = await Message.find({ chatroom }).populate('sender').sort({
      createdTime: 1,
    });

    socket.emit(
      'messages',
      messages.map(({ sender, text, updatedTime }) =>
        formatMessage(sender.shortId, text, updatedTime),
      ),
    );
  }

  io.on('connection', async socket => {
    const userId = socket.request.headers['user-id'];
    const user = await User.findOne({ shortId: userId });

    const buyerId = socket.request.headers['buyer-id'];

    const postId = socket.request.headers['post-id'];
    const post = await Post.findOne({ shortId: postId });
    const shortId = postId + buyerId;

    const chatroom = await ChatRoom.findOne({ shortId }).populate('post');

    socket.join(chatroom.shortId);
    await initMessages(socket, chatroom);

    socket.on('message', async message => {
      const msg = await Message.create({
        chatroom,
        sender: user,
        text: message,
        updatedTime: moment(new Date()).format(),
      });

      io.to(chatroom.shortId).emit(
        'message',
        formatMessage(user.shortId, message, msg.updatedTime),
      );

      if (chatroom.seller === undefined) {
        await ChatRoom.updateOne(
          {
            shortId,
          },
          {
            seller: post.author,
          },
        );
      }
    });

    socket.on('disconnect', async () => {
      const room = await ChatRoom.findOne({ shortId });
    });
  });
};
