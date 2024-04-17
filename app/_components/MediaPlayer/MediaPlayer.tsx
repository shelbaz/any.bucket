"use client";

import { MediaContext } from "@/app/_context/MediaContext";
import { getFileTypeFromExtension } from "@/app/_helpers/files";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { MutableRefObject, useContext, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const MediaPlayer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    mediaFile,
    setIsPlaying,
    isPlaying,
    isFullScreen,
    setFullScreen,
    mediaRef,
    close,
  } = useContext(MediaContext);

  useHotkeys("ESC", () => {
    if (mediaFile) {
      close();
    }
  });

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [mediaFile]);

  if (!mediaFile || isLoading) {
    return null;
  }

  const fileType = getFileTypeFromExtension(mediaFile.split(".").pop() ?? "");
  const fileUrl = `${process.env.NEXT_PUBLIC_S3_DOMAIN}/${mediaFile}`;

  return (
    <div
      className="group fixed w-auto lg:w-auto bottom-6 right-1/2 transform translate-x-1/2 lg:translate-x-0 mx-4 lg:right-6 bg-black rounded overflow-hidden"
      style={{
        boxShadow:
          "0 0 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      {fileType === "audio" && (
        <>
          <audio
            id="audio-element"
            ref={mediaRef as MutableRefObject<HTMLAudioElement>}
            controls
            controlsList="nofullscreen nodownload"
            src={fileUrl}
            className="hidden"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            autoPlay
          />
          {mediaFile && <div className="text-white">Now Playing</div>}
        </>
      )}
      {fileType === "video" && (
        <video
          ref={mediaRef as MutableRefObject<HTMLVideoElement>}
          className="max-w-xl h-auto"
          controls
          controlsList="nodownload"
          src={fileUrl}
          autoPlay
        />
      )}

      <div
        className="group-hover:opacity-100 opacity-0 duration-100 absolute top-3 right-3 rounded-full h-6 w-6 bg-black cursor-pointer flex items-center justify-center"
        onClick={() => {
          close();
        }}
      >
        <XCircleIcon className="h-6 w-6 text-white hover:opacity-90" />
      </div>
    </div>
  );
};
