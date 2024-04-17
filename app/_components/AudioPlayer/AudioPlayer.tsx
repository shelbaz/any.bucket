"use client";

import { AudioContext } from "@/app/_context/AudioContext";
import { useContext, useEffect, useState } from "react";

export const AudioPlayer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { audioFile, setIsPlaying } = useContext(AudioContext);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [audioFile]);

  if (!audioFile || isLoading) {
    return null;
  }

  const fileUrl = `${process.env.NEXT_PUBLIC_S3_DOMAIN}/${audioFile}`;

  return (
    <div className="w-full fixed lg:absolute bottom-0 left-0 py-3 px-4">
      <audio
        controls
        controlsList="nofullscreen nodownload"
        className="w-full"
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
