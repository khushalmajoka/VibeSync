import { useState } from "react";
import { getRoomId } from "../utility/utils";

const useCheckRoomExists = () => {
  const [checkingRoomExists, setCheckingRoomExists] = useState(false);

  const checkRoomExists = async (roomIdOrLink) => {
    setCheckingRoomExists(true);
    const roomId = getRoomId(roomIdOrLink);

    if (roomId) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/check-room`,
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
          setCheckingRoomExists(false);
          return true;
        } else {
          setCheckingRoomExists(false);
          return false;
        }
      } catch (error) {
        console.error("Error while checking the room:", error);
        alert("An error occurred while checking the room. Please try again.");
        setCheckingRoomExists(false);
        return false;
      }
    } else {
      setCheckingRoomExists(false);
      alert("Invalid Room ID or Link");
      return false;
    }
  };

  return { checkRoomExists, checkingRoomExists };
};

export default useCheckRoomExists;