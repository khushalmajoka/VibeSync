import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoomId } from "../store/roomSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [joinRoomId, setJoinRoomId] = useState("");

  const createRoom = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/create-room`);
    const data = await response.json();
    dispatch(setRoomId(data.roomId));
    navigate(`/room/${data.roomId}`);
  };

  const joinRoom = () => {
    if (joinRoomId) {
      dispatch(setRoomId(joinRoomId));
      navigate(`/room/${joinRoomId}`);
    }else{
      alert("Please enter Room ID or create a new Room");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1
        className="text-4xl font-bold text-blue-600 mb-8 cursor-pointer"
      >
        VibeSync
      </h1>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center">
          <div className="flex">
            <button
              className="mr-8 mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
              onClick={createRoom}
            >
              Create Room
            </button>
            <div className="mt-8 flex items-center">
              <input
                type="text"
                placeholder="Enter Room ID"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
                className="px-2 py-1 border rounded mr-3"
              />
              <button
                className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                onClick={joinRoom}
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
