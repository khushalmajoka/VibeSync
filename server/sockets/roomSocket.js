const { setVideoIdInRedisRoom } = require("../redis/index");

const videoSocket = (io) => {

    io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`);
  
      socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`${socket.id} joined room: ${roomId}`);
      });
  
      socket.on("sync-video", (data) => {
        const { action, currentTime, roomId } = data;
        socket.to(roomId).emit("sync-video", { action, currentTime });
      });
  
      socket.on("send-message", (data) => {
        socket.to(data.roomId).emit("receive-message", {text: data.text, sender: data.sender});
      });

      socket.on("video-id", (data) => {
        setVideoIdInRedisRoom(data.videoId, data.roomId);
        socket.to(data.roomId).emit("receive-video-id", {videoId: data.videoId});
      });
  
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  };
  
  module.exports = videoSocket;