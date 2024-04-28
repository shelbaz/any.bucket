"use client";
import { createContext, useState } from "react";

interface UploadContextType {
  uploadModalIsOpen: boolean;
  setUploadModalIsOpen: (isOpen: boolean) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  fileQueue: Array<{
    objectKey: string;
    progress: number;
  }>;
  addFilesToQueue: (
    file: {
      objectKey: string;
      progress: number;
    }[]
  ) => void;
  removeFileFromQueue: (objectKey: string) => void;
  updateFileProgress: (objectKey: string, progress: number) => void;
  clearFileQueue: () => void;
}

const initialValue: UploadContextType = {
  uploadModalIsOpen: false,
  setUploadModalIsOpen: () => {},
  files: [],
  setFiles: () => {},
  fileQueue: [],
  addFilesToQueue: () => {},
  removeFileFromQueue: () => {},
  updateFileProgress: () => {},
  clearFileQueue: () => {},
};

export const UploadContext = createContext<UploadContextType>(initialValue);

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileQueue, setFileQueue] = useState<UploadContextType["fileQueue"]>(
    []
  );

  const addFilesToQueue = (
    files: {
      objectKey: string;
      progress: number;
    }[]
  ) => {
    setFileQueue((prev) => [...prev, ...files]);
  };

  const removeFileFromQueue = (objectKey: string) => {
    setFileQueue((prev) => prev.filter((file) => file.objectKey !== objectKey));
  };

  const updateFileProgress = (objectKey: string, progress: number) => {
    const index = fileQueue.findIndex((file) => file.objectKey === objectKey);
    if (index < 0 || fileQueue[index].progress > progress) return;
    setFileQueue((prev) => {
      const newQueue = [...prev];
      newQueue[index].progress = progress;
      return newQueue;
    });
  };

  const clearFileQueue = () => {
    setFileQueue([]);
  };

  return (
    <UploadContext.Provider
      value={{
        uploadModalIsOpen,
        setUploadModalIsOpen,
        files,
        setFiles,
        fileQueue,
        addFilesToQueue,
        removeFileFromQueue,
        updateFileProgress,
        clearFileQueue,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
