import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoomId } from "../store/roomSlice";

const useCreateRoom = () => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createRoom = async (nickname) => {
    setIsCreatingRoom(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/create-room`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname }),
        }
      );

      const data = await response.json();
      dispatch(setRoomId(data.roomId));
      navigate(`/room/${data.roomId}`);
    } catch (error) {
      console.error("Error while creating the room:", error);
      alert("An error occurred while creating the room. Please try again.");
    } finally {
      setIsCreatingRoom(false);
    }
  };

  return { createRoom, isCreatingRoom };
};

export default useCreateRoom;