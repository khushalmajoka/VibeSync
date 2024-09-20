const { v4: uuidv4 } = require("uuid");

let rooms = {};

const createRoom = (req, res) => {
  const roomId = uuidv4();
  rooms[roomId] = {
    videoId: null,
  };
  res.json({ roomId });
};

module.exports = { createRoom };
