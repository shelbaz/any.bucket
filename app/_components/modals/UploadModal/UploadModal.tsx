"use client";
import { useCallback, useContext, useState } from "react";
import { Modal } from "../Modal";
import { UploadContext } from "@/app/_context/UploadContext";
import { useUploadFile } from "@/app/_hooks/files";
import { AppContext } from "@/app/_context/AppContext";
import { PayButton } from "../../PayButton/PayButton";
import { SessionContext } from "@/app/_context/SessionContext";
import { Button } from "../../buttons/Button";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/16/solid";

export const UploadModal = () => {
  const router = useRouter();
  const { folder } = useContext(AppContext);
  const { session } = useContext(SessionContext);
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

  const getPrimaryButton = () => {
    if (!session.plan || session.plan === "free") {
      return <PayButton label="Purchase To Upload - $19 (one time)" />;
    }

    if (!session.bucketId) {
      return (
        <Button
          label="Add a Bucket"
          onClick={() => router.push("/settings/buckets")}
          Icon={<PlusIcon className="h-4 w-4" />}
        />
      );
    }

    if (!uploadComplete && Object.keys(fileQueue).length === 0) {
      return {
        label: "Start uploading",
        onClick: () => {
          uploadFiles(0, 4);
        },
        disabled: Object.keys(fileQueue).length > 0 && !uploadComplete,
      };
    }

    return {
      label: "Done",
      onClick: handleClose,
      disabled: !uploadComplete,
    };
  };

  return (
    <Modal
      isOpen={uploadModalIsOpen}
      handleClose={handleClose}
      title="Upload Files"
      confirmButton={getPrimaryButton()}
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
