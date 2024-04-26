"use client";

import { useContext } from "react";
import { Modal } from "../Modal";
import { UploadContext } from "@/app/_context/UploadContext";
import { useUploadFile } from "@/app/_hooks/files";
import { useParams } from "next/navigation";

export const UploadModal = () => {
  const params = useParams();
  const folder =
    typeof params.folder === "object" ? params.folder.join("/") : params.folder;
  const {
    fileQueue,
    addFilesToQueue,
    files,
    uploadModalIsOpen,
    setUploadModalIsOpen,
  } = useContext(UploadContext);
  const { uploadFile } = useUploadFile({ folder });

  const handleClose = () => {
    setUploadModalIsOpen(false);
  };

  //   TODO: Figure out file queuing
  const startUploading = () => {
    // Upload files, but with these rules
    // 1. Only 5 files can be uploaded at a time
    // 2. Once 1 file is finished, another should be added to the queue (if there are more left)
    const filesToUpload = files.slice(0, 5);
    const remainingFiles = files.slice(5);

    filesToUpload.forEach((file) => {
      uploadFile(file);
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
          handleClose();
        },
      }}
      cancelButton={{
        label: "Cancel",
        onClick: handleClose,
      }}
    >
      <div className="py-2">
        <ul>
          {files.map((file) => {
            return <li key={file.name}>{file.name}</li>;
          })}
        </ul>
      </div>
    </Modal>
  );
};
