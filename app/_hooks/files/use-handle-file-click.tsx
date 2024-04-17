"use client";

import { MediaContext } from "@/app/_context/MediaContext";
import { useContext } from "react";

export const useHandleFileClick = (objectKey: string, type: string) => {
  const { play, setMediaFile } = useContext(MediaContext);
  let handleFileClick = () => {};
  if (type === "audio") {
    handleFileClick = () => {
      setMediaFile(objectKey);
      play();
    };
  } else {
    handleFileClick = () => {
      console.log("File type not supported");
    };
  }

  return handleFileClick;
};
