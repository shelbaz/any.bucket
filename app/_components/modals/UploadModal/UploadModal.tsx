"use client";
import { useCallback, useContext, useState } from "react";
import { Modal } from "../Modal";
import { UploadContext } from "@/app/_context/UploadContext";
import { useUploadFile } from "@/app/_hooks/files";
import { AppContext } from "@/app/_context/AppContext";

export const UploadModal = () => {
  const { folder } = useContext(AppContext);
  const {
    fileQueue,
    setFiles,
    clearFileQueue,
    updateFileProgress,
    files,
    uploadModalIsOpen,
    setUploadModalIsOpen,
  } = useContext(UploadContext);
  const { uploadFile } = useUploadFile();
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleClose = () => {
    setUploadModalIsOpen(false);
    setFiles([]);
    clearFileQueue();
    setUploadComplete(false);
  };

  const uploadFiles = useCallback(
    async (index: number, batchSize: number) => {
      const batch = files.slice(index, index + batchSize);
      if (batch.length) {
        await Promise.all(
          batch.map(async (file) => {
            const objectKey = folder ? `${folder}/${file.name}` : file.name;
            try {
              await uploadFile(file, (progress) => {
                updateFileProgress(progress, objectKey);
              });
            } catch (error) {
              console.error("Error uploading file", error);
            }
          })
        );
        uploadFiles(index + batchSize, batchSize);
      } else {
        setUploadComplete(true);
      }
    },
    [files, folder, updateFileProgress, uploadFile]
  );

  console.log("OPEN:", uploadModalIsOpen);

  return (
    <Modal
      isOpen={uploadModalIsOpen}
      handleClose={handleClose}
      title="Upload Files"
      confirmButton={
        !uploadComplete && Object.keys(fileQueue).length === 0
          ? {
              label: "Start uploading",
              onClick: () => {
                uploadFiles(0, 4);
              },
              disabled: Object.keys(fileQueue).length > 0 && !uploadComplete,
            }
          : {
              label: "Done",
              onClick: handleClose,
              disabled: !uploadComplete,
            }
      }
      cancelButton={
        !uploadComplete
          ? {
              label: "Cancel",
              onClick: handleClose,
              disabled: uploadComplete,
            }
          : undefined
      }
    >
      <div className="py-2">
        <ul className="flex flex-col space-y-1">
          {files.map((file) => {
            const objectKey = folder ? `${folder}/${file.name}` : file.name;
            const queuedFileProgress = fileQueue[objectKey];
            return (
              <li
                key={file.name}
                className="rounded py-1 px-3 relative flex items-center justify-between overflow-hidden"
              >
                <div
                  className="absolute bottom-0 left-0 bg-blue-100 h-full -z-10 duration-300"
                  style={{
                    width: `${queuedFileProgress}%`,
                  }}
                ></div>
                <span className="line-clamp-1">{file.name}</span>
                <span>{queuedFileProgress ?? 0}%</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};
