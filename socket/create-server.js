const socket = io();

socket.emit('join', { username, room }, error => {});
