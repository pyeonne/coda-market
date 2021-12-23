import { formatMessage } from './utils/messages.js';
import { getCurrentUser, userJoin, userLeave } from './utils/users.js';
import { Server } from 'socket.io';

const create_server = server => {
  //socket io 통신
  const io = new Server(server, { credentials: true });

  io.on('connection', async socket => {
    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
      socket.join('게시물 이름');

      socket.emit(
        'message',
        formatMessage(
          'ChatBot',
          '"상대방에 대한 비방 및 욕설 시 형사적으로 처벌을 받을 수 있습니다.',
        ),
      );
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          formatMessage('ChatBot', `${user.username}님이 들어왔습니다.`),
        );
    });
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage('ChatBot', `${user.username}님이 나가셨습니다.`),
        );
      }
    });

    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
  });
};

export default create_server;
