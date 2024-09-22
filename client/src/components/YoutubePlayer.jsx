import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube";
import { setVideoId } from "../store/roomSlice";
import { emitVideoId } from "../services/socketService";

const YoutubePlayer = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const videoId = useSelector((state) => state.room.videoId);
  const roomId = useSelector((state) => state.room.roomId);
  const dispatch = useDispatch();

  const extractVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleVideoChange = (event) => {
    const url = event.target.value;
    setVideoUrl(url);
    const id = extractVideoId(url);
    dispatch(setVideoId(id));
    emitVideoId(id, roomId);
  };

  const onReady = (event) => {

  };

  const onPause = () => {
    
  };

  const onPlay = () => {
    
  };

  const opts = {
    height: "390",
    width: "650",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-6">
        <input
          type="text"
          value={videoUrl}
          onChange={handleVideoChange}
          placeholder="Enter YouTube video link"
          className="mb-4 w-96 p-2 border bg-gray-100 border-gray-300 rounded"
        />
      </div>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
      />
    </div>
  );
};

export default YoutubePlayer;
