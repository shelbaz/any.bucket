"use client";

import { MediaContext } from "@/app/_context/MediaContext";
import { getFileTypeFromExtension } from "@/app/_helpers/files";
import { useContext, useEffect, useRef, useState } from "react";
// @ts-ignore
import AudioSpectrum from "react-audio-spectrum";

export const MediaPlayer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mediaFile, setIsPlaying, isFullScreen, setFullScreen, audioRef } =
    useContext(MediaContext);

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
    <div className="fixed bottom-4 right-4 p-4 bg-black">
      <audio
        id="audio-element"
        ref={audioRef}
        controls
        controlsList="nofullscreen nodownload"
        autoPlay={true}
        src={fileUrl}
        className="hidden"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};
