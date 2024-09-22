import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoomId } from "../store/roomSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [joinRoomId, setJoinRoomId] = useState("");

  const createRoom = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/create-room`
    );
    const data = await response.json();
    dispatch(setRoomId(data.roomId));
    navigate(`/room/${data.roomId}`);
  };

  const joinRoom = () => {
    if (joinRoomId) {
      dispatch(setRoomId(joinRoomId));
      navigate(`/room/${joinRoomId}`);
    } else {
      alert("Please enter Room ID or create a new Room");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-600 m-5 cursor-pointer">
        VibeSync
      </h1>

      <div className="flex flex-col sm:space-x-4 w-4/5 lg:w-1/2 items-center">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={joinRoomId}
          onChange={(e) => setJoinRoomId(e.target.value)}
          className="w-full max-w-md px-4 py-2 m-2 bg-white border border-slate-300 rounded-md text-base shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <div className="m-4 sm:m-5 flex w-[90%] max-w-xs justify-evenly">
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            onClick={createRoom}
          >
            Create Room
          </button>

          <button
            className="px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
