import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoomId, setVideoId } from "../store/roomSlice";
import { getRoomId } from "../utility/utils";

const useJoinRoom = () => {
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const joinRoom = async (roomIdOrLink, nickname) => {
    setIsJoiningRoom(true);
    const roomId = getRoomId(roomIdOrLink);

    if (roomId) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/join-room`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomId, nickname }),
          }
        );

        const data = await response.json();

        if (data.success) {
          dispatch(setRoomId(roomId));
          dispatch(setVideoId(data.room.videoId || null));
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
    } else {
      setIsJoiningRoom(false);
      alert("Invalid Room ID or Link");
    }
  };

  return { joinRoom, isJoiningRoom };
};

export default useJoinRoom;
