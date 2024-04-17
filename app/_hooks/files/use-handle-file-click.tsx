"use client";

import { AudioContext } from "@/app/_context/AudioContext";
import { useContext } from "react";

export const useHandleFileClick = (objectKey: string, type: string) => {
  const { play, setAudioFile } = useContext(AudioContext);
  let handleFileClick = () => {};
  if (type === "audio") {
    handleFileClick = () => {
      setAudioFile(objectKey);
      play();
    };
  } else {
    handleFileClick = () => {
      console.log("File type not supported");
    };
  }

  return handleFileClick;
};
