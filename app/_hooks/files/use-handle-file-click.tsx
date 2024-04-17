"use client";

import { MediaContext } from "@/app/_context/MediaContext";
import { useContext } from "react";

export const useHandleFileClick = (objectKey: string, type: string) => {
  const { play, pause, audioRef, mediaFile, setMediaFile } =
    useContext(MediaContext);
  let handleFileClick = () => {};
  if (type === "audio") {
    handleFileClick = () => {
      if (objectKey !== mediaFile) {
        setMediaFile(objectKey);
      }
      if (audioRef?.current?.paused) {
        play();
      } else {
        pause();
      }
    };
  } else {
    handleFileClick = () => {
      console.log("File type not supported");
    };
  }

  return handleFileClick;
};
