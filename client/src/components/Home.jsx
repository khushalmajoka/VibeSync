import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoomId } from "../store/roomSlice";
import LinearProgress from "@mui/material/LinearProgress";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [joinRoomIdOrRoomLink, setJoinRoomIdOrRoomLink] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);

  const createRoom = async () => {
    setIsCreatingRoom(true);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/create-room`
    );
    const data = await response.json();
    dispatch(setRoomId(data.roomId));
    setIsCreatingRoom(false);
    navigate(`/room/${data.roomId}`);
  };

  const getRoomId = (joinRoomIdOrRoomLink) => {
    if (
      joinRoomIdOrRoomLink.startsWith("http://") ||
      joinRoomIdOrRoomLink.startsWith("https://")
    ) {
      try {
        const url = new URL(joinRoomIdOrRoomLink);
        return url.pathname.split("/").pop();
      } catch (error) {
        alert("Invalid room link");
        return;
      }
    } else {
      return joinRoomIdOrRoomLink;
    }
  };

  const joinRoom = async () => {
    setIsJoiningRoom(true);
    if (joinRoomIdOrRoomLink) {
      const roomId = getRoomId(joinRoomIdOrRoomLink);

      if (roomId) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/join-room`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ roomId }),
            }
          );

          const data = await response.json();

          if (data.success) {
            dispatch(setRoomId(roomId));
            navigate(`/room/${roomId}`);
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Error while joining the room:", error);
          alert("An error occurred while joining the room. Please try again.");
        } finally {
          setIsJoiningRoom(false);
        }
      }
    } else {
      setIsJoiningRoom(false);
      alert("Please enter Room ID or create a new Room");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full absolute top-0">
        {isCreatingRoom || isJoiningRoom ? <LinearProgress /> : null}
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-600 m-5 cursor-pointer">
        VibeSync
      </h1>

      <div className="flex flex-col sm:space-x-4 w-4/5 lg:w-1/2 items-center">
        <input
          type="text"
          placeholder="Enter Room ID or Room Link"
          value={joinRoomIdOrRoomLink}
          onChange={(e) => setJoinRoomIdOrRoomLink(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await joinRoom();
            }
          }}
          className="w-full max-w-md px-4 py-2 m-2 bg-white border border-slate-300 rounded-md text-base shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <div className="m-4 sm:m-5 flex w-[90%] max-w-xs justify-evenly">
          <button
            className={`${
              isCreatingRoom ? "cursor-wait opacity-50 hover:bg-blue-500" : ""
            } px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none`}
            onClick={createRoom}
            disabled={isCreatingRoom ? "disabled" : ""}
          >
            Create Room
          </button>

          <button
            className={`${
              isJoiningRoom ? "cursor-wait opacity-50 hover:bg-blue-500" : ""
            } px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none`}
            onClick={joinRoom}
            disabled={isJoiningRoom ? "disabled" : ""}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
