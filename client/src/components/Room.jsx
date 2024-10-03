import React, { useEffect, useState } from "react";
import YoutubePlayer from "./YoutubePlayer";
import ChatBox from "./ChatBox";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  disconnectSocket,
  initiateSocketConnection,
} from "../services/socketService";
import { clearMessages, setRoomId, setVideoId } from "../store/roomSlice";
import { BackgroundBeams } from "./ui/background-beams";
import useCheckRoomExists from "../hooks/useCheckRoomExists";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  useModal,
} from "./ui/animated-modal";
import { Input } from "./ui/input";
import useJoinRoom from "../hooks/useJoinRoom";

const Room = () => {
  const navigate = useNavigate();
  const roomId = useSelector((state) => state.room.roomId);
  const [player, setPlayer] = useState(null);
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();
  const { checkRoomExists, checkingRoomExists } = useCheckRoomExists();
  const { joinRoom, isJoiningRoom } = useJoinRoom();
  const { setOpen } = useModal();

  const handleSubmit = () => {
    if (!nickname.trim()) {
      alert("Please enter a nickname");
      return;
    }

    joinRoom(roomId, nickname).then(() => {
      setOpen(false);
    })
  };

  useEffect(() => {
    const initRoom = async () => {
      let currentRoomId = roomId;
      if (!currentRoomId) {
        currentRoomId = window.location.pathname.substring(6);
        const exists = await checkRoomExists(currentRoomId);

        if (exists) {
          dispatch(setRoomId(currentRoomId));
          setOpen(true);
        } else {
          navigate("/pagenotfound");
          return;
        }
      }

      initiateSocketConnection(currentRoomId, dispatch, player);

      return () => {
        disconnectSocket();
      };
    };

    initRoom();
  }, [roomId, checkRoomExists, dispatch, player, navigate, setOpen]);

  const handleTitleClick = () => {
    if (window.location.pathname !== "/") {
      dispatch(setRoomId(null));
      dispatch(setVideoId(null));
      dispatch(clearMessages());
      navigate("/");
    }
  };

  return (
    <div className="h-full bg-neutral-950 flex flex-col items-center antialiased">
      {/* <ModalBody>
        <ModalContent>
          <h4 className="text-lg md:text-2xl text-neutral-100 font-bold text-center mb-8">
            Welcome to VibeSync!
          </h4>
          <div className="py-1 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start mx-auto w-full max-w-md">
            <div className="w-full flex items-center justify-center">
              <Input
                placeholder="Pick a nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </div>
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <button
            className="relative group/btn bg-white block text-black h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] px-2 py-1 rounded-md w-28"
            onClick={handleSubmit}
          >
            Join Room
          </button>
        </ModalFooter>
      </ModalBody> */}

      <div className="w-full flex md:flex-none md:justify-start justify-center z-10">
        <h1
          className="text-5xl font-sans bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-bold text-blue-600 m-8 md:mt-7 md:ml-8 md:mb-0 cursor-pointer"
          onClick={handleTitleClick}
        >
          VibeSync
        </h1>
      </div>
      <div className="h-full flex flex-col md:flex-row w-screen md:justify-evenly items-center z-10">
        <YoutubePlayer player={player} setPlayer={setPlayer} />
        <ChatBox />
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Room;
