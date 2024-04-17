"use client";
import { createContext, useMemo, useRef, useState } from "react";

interface MediaContextType {
  audioRef?: React.MutableRefObject<HTMLAudioElement | null>;
  mediaFile: string | null;
  isFullScreen: boolean;
  isPlaying: boolean;
  setMediaFile: (MediaFile: string | null) => void;
  setFullScreen: (isFullScreen: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  play: () => void;
  pause: () => void;
  close: () => void;
}

const initialValue: MediaContextType = {
  mediaFile: null,
  isFullScreen: false,
  isPlaying: false,
  setMediaFile: () => {},
  setFullScreen: () => {},
  setIsPlaying: () => {},
  play: () => {},
  pause: () => {},
  close: () => {},
};

export const MediaContext = createContext<MediaContextType>(initialValue);

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<MediaContextType["isPlaying"]>(
    initialValue.isPlaying
  );
  const [mediaFile, setMediaFile] = useState<MediaContextType["mediaFile"]>(
    initialValue.mediaFile
  );
  const [isFullScreen, setFullScreen] = useState<
    MediaContextType["isFullScreen"]
  >(initialValue.isFullScreen);

  const play = () => {
    audioRef?.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef?.current?.pause();
    setIsPlaying(false);
  };

  const close = () => {
    setMediaFile(null);
    setIsPlaying(false);
    audioRef?.current?.pause();
  };

  return (
    <MediaContext.Provider
      value={{
        audioRef,
        mediaFile,
        isFullScreen,
        isPlaying,
        setIsPlaying,
        setMediaFile,
        setFullScreen,
        play,
        pause,
        close,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
