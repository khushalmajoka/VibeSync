let rooms = {};

module.exports = {
  rooms,

  createRoomInDataStore: (roomId) => {
    rooms[roomId] = { users: [], videoId: null, messages: [] };
    console.log(rooms);
  },

  getRoomFromDataStore: (roomId) => {
    console.log(rooms);
    return rooms[roomId] || null;
  },

  addUserToRoom: (nickname, roomId) => {
    rooms[roomId].users.push(nickname);
    console.log(rooms);
  },

  setVideoId: (videoId, roomId) => {
    rooms[roomId].videoId = videoId;
    console.log(rooms);
  },
};
