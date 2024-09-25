import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube";
import { setVideoId } from "../store/roomSlice";
import { emitVideoId } from "../services/socketService";
import { MdOutlineContentCopy } from "react-icons/md";

const YoutubePlayer = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const videoId = useSelector((state) => state.room.videoId);
  const roomId = useSelector((state) => state.room.roomId);
  const roomLink = window.location.href;
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomLink).then(
      () => {
        alert("Room link copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy the link: ", err);
      }
    );
  };

  const onReady = (event) => {};

  const onPause = () => {};

  const onPlay = () => {};

  const opts = {
    width:
      window.innerWidth >= 768 ? "800" : (window.innerWidth * 0.9).toString(),
    height:
      (window.innerWidth >= 768 ? "750" : window.innerWidth * 0.9) * (9 / 16),
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-6 w-full flex justify-center md:flex-none md:justify-center">
        <input
          type="text"
          value={videoUrl}
          onChange={handleVideoChange}
          placeholder="Enter YouTube video link"
          className="mb-4 w-3/4 md:w-2/3 p-2 border bg-gray-100 border-gray-300 rounded"
        />
      </div>
      <div class="">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="mt-8 px-4 py-2 w-auto text-sm sm:text-base bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none flex"
          onClick={copyToClipboard}
        >
          {roomLink.slice(0, 35) + '...'}
          <MdOutlineContentCopy className="ml-3 self-center" />
        </button>
      </div>
    </div>
  );
};

export default YoutubePlayer;
