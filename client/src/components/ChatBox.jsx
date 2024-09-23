import React, { useState } from "react";
import { checkForSocketId, sendMessage } from "../services/socketService";
import { useDispatch, useSelector } from "react-redux";

const ChatBox = () => {
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
    <div className="w-2/3 md:w-1/4 md:max-w-96 min-h-96 h-full flex flex-col m-10 md:m-0 bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-blue-500 text-white text-center font-bold py-2 rounded-t-lg">
        Room Chat
      </div>

      <div className="grow overflow-y-auto p-4 flex flex-col space-y-2 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              checkForSocketId(msg.sender)
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center p-3 bg-gray-200 rounded-b-lg">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessageHandler()}
          placeholder="Type a message..."
        />
        <button
          className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={sendMessageHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
