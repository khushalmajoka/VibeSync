import React, { useRef, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import useCreateRoom from "../hooks/useCreateRoom";
import useJoinRoom from "../hooks/useJoinRoom";
import { BackgroundLines } from "./ui/background-lines";
import { Input } from "./ui/input";
// import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";

const Home = () => {
  const [joinRoomIdOrRoomLink, setJoinRoomIdOrRoomLink] = useState("");
  const [nickname, setNickname] = useState("");
  const [currentAction, setCurrentAction] = useState(null);
  const joinButtonRef = useRef(null);

  const { createRoom, isCreatingRoom } = useCreateRoom();
  const { joinRoom, isJoiningRoom } = useJoinRoom();

  const handleSubmit = () => {
    if (!nickname.trim()) {
      alert("Please enter a nickname");
      return;
    }

    if (currentAction === "create") {
      createRoom(nickname);
    } else if (currentAction === "join") {
      joinRoom(joinRoomIdOrRoomLink, nickname);
    }
  };

  return (
    <BackgroundLines>
      <Modal>
        <div className="relative min-h-screen flex flex-col items-center justify-center">
          <ModalBody>
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
          </ModalBody>
          <div className="w-full absolute top-0">
            {isCreatingRoom || isJoiningRoom ? <LinearProgress /> : null}
          </div>
          <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-800 to-white text-4xl sm:text-5xl md:text-6xl font-sans font-bold m-5 tracking-tight">
            VibeSync
          </h1>
          <div className="flex flex-col sm:space-x-4 w-4/5 lg:w-1/2 items-center">
            <Input
              placeholder="Enter Room ID or Room Link"
              type="text"
              value={joinRoomIdOrRoomLink}
              onChange={(e) => setJoinRoomIdOrRoomLink(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  joinButtonRef.current.click();
                }
              }}
            />
            <div className="m-4 sm:m-5 flex w-[90%] max-w-xs justify-evenly">
              <ModalTrigger>
                <button
                  className={`bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset, px-4 0px_-1px_0px_0px_#ffffff40_inset] mr-5`}
                  onClick={() => setCurrentAction("create")}
                  disabled={isCreatingRoom ? "disabled" : ""}
                >
                  Create Room
                  <BottomGradient />
                </button>
              </ModalTrigger>

              <ModalTrigger>
                <button
                  ref={joinButtonRef}
                  className={`${
                    isJoiningRoom
                      ? "cursor-wait opacity-50 hover:bg-blue-500"
                      : ""
                  } bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block px-4 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ml-5`}
                  onClick={() => setCurrentAction("join")}
                  disabled={isJoiningRoom ? "disabled" : ""}
                >
                  Join Room
                  <BottomGradient />
                </button>
              </ModalTrigger>
            </div>
          </div>
        </div>
      </Modal>
    </BackgroundLines>
  );
};

export default Home;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-[3px] w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-[3px] w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
