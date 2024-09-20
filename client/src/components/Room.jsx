import React, { useEffect } from "react";
import YoutubePlayer from "./YoutubePlayer";
import ChatBox from "./ChatBox";
import { MdOutlineContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disconnectSocket, initiateSocketConnection } from "../services/socketService";
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
    if(window.location.pathname !== '/'){
        dispatch(setRoomId(null));
        dispatch(setVideoId(null));
        dispatch(clearMessages());
        navigate("/");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId).then(
      () => {
        alert("Room link copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy the link: ", err);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1
        className="text-4xl font-bold text-blue-600 m-10 cursor-pointer"
        onClick={handleTitleClick}
      >
        VibeSync
      </h1>
      <div className="flex w-screen justify-evenly">
        <YoutubePlayer />
        <ChatBox />
      </div>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none flex"
        onClick={copyToClipboard}
      >
        {roomId}
        <MdOutlineContentCopy className="ml-3 self-center" />
      </button>
    </div>
  );
};

export default Room;
