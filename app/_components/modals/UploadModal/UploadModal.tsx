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
  const { fileQueue, files, uploadModalIsOpen, setUploadModalIsOpen } =
    useContext(UploadContext);
  const { uploadFile } = useUploadFile({ folder });

  const handleClose = () => {
    setUploadModalIsOpen(false);
  };

  const startUploading = () => {
    // Upload files, but with these rules
    // 1. Only 5 files can be uploaded at a time
    // 2. Once 1 file is finished, another should be added to the queue (if there are more left)
  };

  return (
    <Modal
      isOpen={uploadModalIsOpen}
      handleClose={handleClose}
      title="Rename File"
      confirmButton={{
        label: "Save",
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
        {files.map((file) => {
          return <li key={file.name}>{file.name}</li>;
        })}
      </div>
    </Modal>
  );
};
