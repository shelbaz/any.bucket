"use client";

import { MediaContext } from "@/app/_context/MediaContext";
import { getFileTypeFromExtension } from "@/app/_helpers/files";
import { useContext, useEffect, useRef, useState } from "react";

export const MediaPlayer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mediaFile, setIsPlaying, isFullScreen, setFullScreen } =
    useContext(MediaContext);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    <div className="w-full bottom-0 left-0 py-3 px-4">
      <audio
        ref={audioRef}
        controls
        controlsList="nofullscreen nodownload"
        className="hidden"
        autoPlay={true}
      >
        <source
          src={fileUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </audio>
    </div>
  );
};
