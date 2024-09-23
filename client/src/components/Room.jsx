import React, { useEffect } from "react";
import YoutubePlayer from "./YoutubePlayer";
import ChatBox from "./ChatBox";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  disconnectSocket,
  initiateSocketConnection,
} from "../services/socketService";
import { clearMessages, setRoomId, setVideoId } from "../store/roomSlice";

const Room = () => {
  const navigate = useNavigate();
  const roomId = useSelector((state) => state.room.roomId);
  const dispatch = useDispatch();

  useEffect(() => {
    initiateSocketConnection(roomId, dispatch);

    return () => {
      disconnectSocket();
    };
  });

  const handleTitleClick = () => {
    if (window.location.pathname !== "/") {
      dispatch(setRoomId(null));
      dispatch(setVideoId(null));
      dispatch(clearMessages());
      navigate("/");
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full flex md:flex-none md:justify-start justify-center">
        <h1
          className="text-4xl font-bold text-blue-600 m-8 md:mt-7 md:ml-8 md:mb-7 cursor-pointer"
          onClick={handleTitleClick}
        >
          VibeSync
        </h1>
      </div>
      <div className="flex flex-col md:flex-row w-screen h-full justify-evenly items-center">
        <YoutubePlayer />
        <ChatBox />
      </div>
    </div>
  );
};

export default Room;
