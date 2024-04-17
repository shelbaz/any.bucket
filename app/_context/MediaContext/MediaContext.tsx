"use client";
import { createContext, useState } from "react";

interface MediaContextType {
  isPlaying: boolean;
  mediaFile: string | null;
  isFullScreen: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setMediaFile: (MediaFile: string | null) => void;
  setFullScreen: (isFullScreen: boolean) => void;
  play: () => void;
  pause: () => void;
  close: () => void;
}

const initialValue: MediaContextType = {
  isPlaying: false,
  mediaFile: null,
  isFullScreen: false,
  setIsPlaying: () => {},
  setMediaFile: () => {},
  setFullScreen: () => {},
  play: () => {},
  pause: () => {},
  close: () => {},
};

export const MediaContext = createContext<MediaContextType>(initialValue);

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
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
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const close = () => {
    setIsPlaying(false);
    setMediaFile(null);
  };

  return (
    <MediaContext.Provider
      value={{
        isPlaying,
        mediaFile,
        isFullScreen,
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
