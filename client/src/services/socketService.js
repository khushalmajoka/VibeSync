import { io } from "socket.io-client";
import { setMessages, setVideoId } from "../store/roomSlice";

let socket;

export const initiateSocketConnection = (roomId, dispatch, player) => {
  socket = io(process.env.REACT_APP_SERVER_URL);
  socket.emit("join-room", roomId);
  socket.on("receive-message", (data) => {
    dispatch(setMessages(data));
  });
  socket.on("receive-video-id", (data) => {
    console.log(data);
    dispatch(setVideoId(data.videoId));
  });
  socket.on("sync-video", (data) => {
    const { action, currentTime } = data;
  
    if (player && action === "pause") {
      player.pauseVideo();
      player.seekTo(currentTime);
    } else if (player && action === "play") {
      player.playVideo();
      // player.seekTo(currentTime);
    }
  });
  
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const sendMessage = (message, roomId, dispatch) => {
  socket.emit("send-message", { text: message, sender: socket.id, roomId });
  dispatch(setMessages({ text: message, sender: socket.id }));
};

export const checkForSocketId = (socketId) => {
  if (socketId === socket.id) return true;
  else return false;
};

export const emitVideoId = (videoId, roomId) => {
  socket.emit("video-id", { videoId, roomId });
};

export const syncVideo = (action, currentTime, roomId) => {
  socket.emit("sync-video", { action, currentTime, roomId });
};
