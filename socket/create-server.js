import { Server } from 'socket.io';
import ChatRoom from '../models/ChatRoom.js';
import formatMessage from './utils';
import User from '../models/User.js';
import Post from '../models/Post.js';

socket.emit('join', { username, room }, error => {});

export default server => {
  const io = new Server(server, { credentials: true });
  async function initMessages(socket, chatroom) {
    const messages = await Message.find({ chatroom }).sort({
      createdAt: 1,
    });

    socket.emit(
      'messages',
      messages.map(({ sender, text }) => formatMessage(sender.name, text)),
    );
  }

  io.on('connection', async socket => {
    const user = await User.findOne({ shortId: socket.request.user.id });

    const postId = socket.request.headers['post-id'];
    const post = await Post.findOne({ shortId: postId });
    const chatroom = await ChatRoom.findOne({ post }).populate('post');

    if (!chatroom) {
      socket.emit('message', formatMessage('server', 'Invalid Room Id'));
      socket.disconnect();
    } else {
      socket.join(chatroom.post.shortId);
      await initMessages(socket, chatroom);
    }

    socket.on('message', async message => {
      await Message.create({ chatroom, sender: user, text: message });
      io.to(chatroom.post.shortId).emit(
        'message',
        formatMessage(user.name, message),
      );
    });

    socket.on('disconnect', () => {
      const room = await ChatRoom.findOne({ post });

      if (room.seller === undefined) {
        await ChatRoom.deleteOne({ post });
      }
    });
  });
};
