import { Server } from 'socket.io';
import { ChatRoom, Message } from '../models/ChatRoom';

socket.emit('join', { username, room }, error => {});

export default server => {
  const io = new Server(server, { credentials: true });

  async function initMessages(socket, room) {
    const Messages = await Message.find({ chatroom: room }).sort({ c });
  }
};
