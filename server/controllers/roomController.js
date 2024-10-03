const { v4: uuidv4 } = require("uuid");
const {
  createRoomInRedis,
  getRoomFromRedis,
  addUserToRedisRoom,
} = require("../redis/index");

const createRoom = (req, res) => {
  const roomId = uuidv4();
  const { nickname } = req.body;
  createRoomInRedis(roomId).then(() => {
    addUserToRedisRoom(nickname, roomId);
  });

  res.json({ roomId });
};

const joinRoom = (req, res) => {
  const { roomId, nickname } = req.body;
  const room = getRoomFromRedis(roomId);

  if (room) {
    addUserToRedisRoom(nickname, roomId);
    res.json({ success: true, message: "Joined the room successfully", room });
  } else {
    res.status(404).json({ success: false, message: "Room not found" });
  }
};

const checkRoom = (req, res) => {
  const { roomId } = req.body;
  getRoomFromRedis(roomId).then((roomExists) => {
    if (roomExists) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  });
};

module.exports = { createRoom, joinRoom, checkRoom };
