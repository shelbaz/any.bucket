"use client";

import { MediaContext } from "@/app/_context/MediaContext";
import { useContext } from "react";

export const useHandleFileClick = (objectKey: string, type: string) => {
  const { play, pause, mediaRef, mediaFile, setMediaFile } =
    useContext(MediaContext);
  let handleFileClick = () => {};
  switch (type) {
    case "audio":
    case "video":
      handleFileClick = () => {
        if (objectKey !== mediaFile) {
          setMediaFile(objectKey);
        }
        if (mediaRef?.current?.paused) {
          play();
        } else {
          pause();
        }
      };
      break;
    default:
      handleFileClick = () => {
        console.log("File type not supported");
      };
  }

  return handleFileClick;
};
