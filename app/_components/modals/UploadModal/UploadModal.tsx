"use client";

import { useContext } from "react";
import { Modal } from "../Modal";
import { UploadContext } from "@/app/_context/UploadContext";
import { useUploadFile } from "@/app/_hooks/files";
import { AppContext } from "@/app/_context/AppContext";

export const UploadModal = () => {
  const { folder } = useContext(AppContext);
  const {
    fileQueue,
    setFiles,
    addFilesToQueue,
    clearFileQueue,
    updateFileProgress,
    files,
    uploadModalIsOpen,
    setUploadModalIsOpen,
  } = useContext(UploadContext);
  const { uploadFile } = useUploadFile();

  const handleClose = () => {
    setUploadModalIsOpen(false);
    setFiles([]);
    clearFileQueue();
  };

  const handleUpdateProgress = (progress: number, fileName: string) => {
    const objectKey = folder ? `${folder}/${fileName}` : fileName;
    const fileIndex = fileQueue.findIndex(
      (file) => file.objectKey === objectKey
    );
    if (fileIndex < 0) {
      addFilesToQueue([
        {
          objectKey,
          progress,
        },
      ]);
      return;
    }
    updateFileProgress(objectKey, progress);

    console.log("IN PROGRESS:", progress);
    console.log("IN QUEUE:", fileQueue);
    console.log("IN FILES:", files);

    if (progress === 100 && fileQueue.length < files.length) {
      console.log(fileQueue.length, files.length, fileName);
      uploadFiles(fileQueue.length);
    }
  };

  //   TODO: Figure out file queuing
  const uploadFiles = (startIndex: number, endIndex?: number) => {
    // Upload files, but with these rules
    // 1. Only 5 files can be uploaded at a time
    // 2. Once 1 file is finished, another should be added to the queue (if there are more left)
    const filesToUpload = files.slice(
      startIndex,
      (endIndex ?? startIndex + 1) + 1
    );

    filesToUpload.forEach((file) => {
      uploadFile(file, (progress) => handleUpdateProgress(progress, file.name));
    });
  };

  return (
    <Modal
      isOpen={uploadModalIsOpen}
      handleClose={handleClose}
      title="Upload Files"
      confirmButton={{
        label: "Start uploading",
        onClick: () => {
          uploadFiles(0, 4);
        },
      }}
      cancelButton={{
        label: "Cancel",
        onClick: handleClose,
      }}
    >
      <div className="py-2">
        <ul className="flex flex-col space-y-1">
          {files.map((file) => {
            const queuedFile = fileQueue.find(
              (queued) =>
                queued.objectKey ===
                (folder ? `${folder}/${file.name}` : file.name)
            );
            return (
              <li
                key={file.name}
                className="rounded py-1 px-3 relative flex items-center justify-between overflow-hidden"
              >
                <div
                  className="absolute bottom-0 left-0 bg-blue-200 h-full -z-10 duration-300"
                  style={{
                    width: `${queuedFile?.progress}%`,
                  }}
                ></div>
                <span className="line-clamp-1">{file.name}</span>
                <span>
                  {queuedFile?.progress}
                  {queuedFile ? "%" : ""}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};
