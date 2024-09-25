const { v4: uuidv4 } = require("uuid");
const { createRoomInDataStore, getRoomFromDataStore} = require("../data/rooms");

const createRoom = (req, res) => {
  const roomId = uuidv4();
  createRoomInDataStore(roomId);
  res.json({ roomId });
};

const joinRoom = (req, res) => {
  const { roomId } = req.body;
  const room = getRoomFromDataStore(roomId);

  if (room) {
    res.json({ success: true, message: "Joined the room successfully", room });
  } else {
    res.status(404).json({ success: false, message: "Room not found" });
  }
};

module.exports = { createRoom, joinRoom };
