"use client";
import { createContext, useState } from "react";

interface UploadContextType {
  uploadModalIsOpen: boolean;
  setUploadModalIsOpen: (isOpen: boolean) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  fileQueue: Array<{
    objectKey: string;
    presignedUrl: string;
    progress: number;
  }>;
  addFileToQueue: (file: {
    objectKey: string;
    presignedUrl: string;
    progress: number;
  }) => void;
  removeFileFromQueue: (objectKey: string) => void;
}

const initialValue: UploadContextType = {
  uploadModalIsOpen: false,
  setUploadModalIsOpen: () => {},
  files: [],
  setFiles: () => {},
  fileQueue: [],
  addFileToQueue: () => {},
  removeFileFromQueue: () => {},
};

export const UploadContext = createContext<UploadContextType>(initialValue);

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileQueue, setFileQueue] = useState<UploadContextType["fileQueue"]>(
    []
  );

  const addFileToQueue = (file: {
    objectKey: string;
    presignedUrl: string;
    progress: number;
  }) => {
    setFileQueue((prev) => [...prev, file]);
  };

  const removeFileFromQueue = (objectKey: string) => {
    setFileQueue((prev) => prev.filter((file) => file.objectKey !== objectKey));
  };

  return (
    <UploadContext.Provider
      value={{
        uploadModalIsOpen,
        setUploadModalIsOpen,
        files,
        setFiles,
        fileQueue,
        addFileToQueue,
        removeFileFromQueue,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
