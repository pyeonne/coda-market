const users = [];

export const userJoin = (id, username, room) => {
  const user = { id, username, room };

  users.push(user);

  return user;
};

export const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

export const userLeave = (id) => {
  const idx = users.findIndex((user) => user.id === id);

  if (idx !== -1) {
    return users.splice(idx, 1)[0];
  }
};

export const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};
