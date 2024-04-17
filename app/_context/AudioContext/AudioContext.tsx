"use client";
import { createContext, useState } from "react";

interface AudioContextType {
  isPlaying: boolean;
  audioFile: string | null;
  setIsPlaying: (isPlaying: boolean) => void;
  setAudioFile: (audioFile: string | null) => void;
  play: () => void;
  pause: () => void;
  close: () => void;
}

const initialValue: AudioContextType = {
  isPlaying: false,
  audioFile: null,
  setIsPlaying: () => {},
  setAudioFile: () => {},
  play: () => {},
  pause: () => {},
  close: () => {},
};

export const AudioContext = createContext<AudioContextType>(initialValue);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState<AudioContextType["isPlaying"]>(
    initialValue.isPlaying
  );
  const [audioFile, setAudioFile] = useState<AudioContextType["audioFile"]>(
    initialValue.audioFile
  );

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const close = () => {
    setIsPlaying(false);
    setAudioFile(null);
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        audioFile,
        setIsPlaying,
        setAudioFile,
        play,
        pause,
        close,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
