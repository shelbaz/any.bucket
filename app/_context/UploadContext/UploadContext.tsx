"use client";
import { createContext, useState } from "react";

interface UploadContextType {
  uploadModalIsOpen: boolean;
  setUploadModalIsOpen: (isOpen: boolean) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  fileQueue: Record<string, number>;
  addFilesToQueue: (files: string[]) => void;
  removeFileFromQueue: (objectKey: string) => void;
  updateFileProgress: (progress: number, objectKey: string) => void;
  clearFileQueue: () => void;
}

const initialValue: UploadContextType = {
  uploadModalIsOpen: false,
  setUploadModalIsOpen: () => {},
  files: [],
  setFiles: () => {},
  fileQueue: {},
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
    {}
  );

  const addFilesToQueue = (files: string[]) => {
    console.log("QUEUE BEFORE ADDING:", fileQueue);
    const newQueue = files.reduce((acc, file) => {
      return {
        ...acc,
        [file]: 0,
      };
    }, fileQueue);

    setFileQueue(newQueue);
  };

  const removeFileFromQueue = (objectKey: string) => {
    setFileQueue((prev) => {
      const newQueue = { ...prev };
      delete newQueue[objectKey];
      return newQueue;
    });
  };

  const updateFileProgress = (progress: number, objectKey: string) => {
    setFileQueue((prev) => ({
      ...prev,
      // Progress should be rounded to one decimal place
      [objectKey]: Math.round(progress * 10) / 10,
    }));
  };

  const clearFileQueue = () => {
    setFileQueue({});
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
