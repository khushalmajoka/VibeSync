import React, { useState } from "react";
import { checkForSocketId, sendMessage } from "../services/socketService";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.room.messages);
  const roomId = useSelector((state) => state.room.roomId);

  const sendMessageHandler = () => {
    if (message.trim()) {
      sendMessage(message, roomId, dispatch);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col min-w-80 md:min-w-96 m-10 md:m-0 h-full max-h-[22rem] md:h-4/5 md:max-h-[32rem] md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <h2 className="font-bold text-base md:text-xl text-neutral-200 text-center">
        Room Chat
      </h2>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-5 md:my-5 h-[1px] w-full" />

      <div className="grow overflow-y-auto p-4 flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              checkForSocketId(msg.sender)
                ? "bg-neutral-500 text-white self-end"
                : "bg-neutral-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-5 md:my-5 h-[1px] w-full" />

      <div className="flex items-center p-3 rounded-b-lg">
        <Input
          type="text"
          className="w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessageHandler()}
          placeholder="Type a message..."
        />
        <button
          className="px-4 ml-3 h-10 bg-gradient-to-br text-white rounded-md font-medium from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
          onClick={sendMessageHandler}
        >
          Send
          <BottomGradient />
        </button>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 -bottom-px block transition duration-500 opacity-0 absolute h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      {/* w-full inset-x-0 */}
      <span className="group-hover/btn:opacity-100 -bottom-px blur-sm block transition duration-500 opacity-0 absolute h-px mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      {/* w-1/2 inset-x-10 */}
    </>
  );
};
