import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube";
import { setVideoId } from "../store/roomSlice";
import { emitVideoId, syncVideo } from "../services/socketService";
import { MdOutlineContentCopy, MdOutlineCheck } from "react-icons/md";
import { Input } from "./ui/input";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const YoutubePlayer = ({ player, setPlayer }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [copyPopup, setCopyPopup] = useState(false);
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
        setCopyPopup(true);
        setTimeout(() => {
          setCopyPopup(false);
        }, 3000);
      },
      (err) => {
        console.error("Failed to copy the link: ", err);
      }
    );
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onPause = () => {
    const currentTime = player.getCurrentTime();
    syncVideo("pause", currentTime, roomId);
  };

  const onPlay = () => {
    const currentTime = player.getCurrentTime();
    syncVideo("play", currentTime, roomId);
  };

  const opts = {
    width:
      window.innerWidth >= 768 ? "800" : (window.innerWidth * 0.9).toString(),
    height:
      (window.innerWidth >= 768 ? "750" : window.innerWidth * 0.9) * (9 / 16),
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-6 w-full flex justify-center md:flex-none md:justify-center">
        <Input
          type="text"
          value={videoUrl}
          onChange={handleVideoChange}
          placeholder="Enter YouTube video link"
          closeIcon={true}
        />
      </div>
      <div className="">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
        />
      </div>
      <div className="flex justify-center">
        <HoverBorderGradient
          containerClassName="mt-8"
          as="button"
          onClick={copyToClipboard}
          className="text-sm sm:text-base font-semibold flex"
        >
          <span>{roomLink.slice(0, 35) + "..."}</span>
          <span className="ml-3 self-center">
            {copyPopup ? (
              <MdOutlineCheck/>
            ) : (
              <MdOutlineContentCopy/>
            )}
          </span>
        </HoverBorderGradient>
      </div>
    </div>
  );
};

export default YoutubePlayer;
