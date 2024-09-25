let rooms = {};

module.exports = {
  rooms,

  createRoomInDataStore: (roomId) => {
    rooms[roomId] = { videoId: null, messages: null };
  },

  getRoomFromDataStore: (roomId) => {
    return rooms[roomId] || null;
  },
};
