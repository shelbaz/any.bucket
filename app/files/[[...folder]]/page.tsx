"use client";

import {
  Breadcrumbs,
  BreadcrumbsTopbar,
} from "@/app/_components/layout/Breadcrumbs";
import { useListFiles } from "../../_hooks/files/use-list-files";
import { useRouter, useParams } from "next/navigation";
import { FolderCard } from "@/app/_components/files/FolderCard";
import { FileCard } from "@/app/_components/files/FileCard";
import { useContext, useState } from "react";
import { AppContext } from "@/app/_context/AppContext";
import { FolderRow } from "@/app/_components/files/FolderRow";
import { FileRow } from "@/app/_components/files/FileRow";
import { Loader } from "@/app/_components/loaders/Loader";
import { useDropzone } from "react-dropzone";
import { useUploadFile } from "@/app/_hooks/files";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { RenameModal } from "@/app/_components/modals/RenameModal";
import { useRenameFile } from "@/app/_hooks/files/use-rename-file";
import { _Object } from "@aws-sdk/client-s3";
import { UploadContext } from "@/app/_context/UploadContext";
import { DocumentsEmptyState } from "@/app/_components/empty-states/DocumentsEmptyState";
import { PaginationButtons } from "@/app/_components/pagination/PaginationButtons";

type Folder = { prefix: string; label: string };

const FilePage = () => {
  const { fileLayout, renameFileModal, setRenameFileModal, setPage, page } =
    useContext(AppContext);
  const router = useRouter();
  const [continuationToken, setContinuationToken] = useState<
    string | undefined
  >();
  const { setFiles, setUploadModalIsOpen } = useContext(UploadContext);
  const { folder } = useContext(AppContext);
  const crumbs =
    folder
      ?.split("/")
      .map((folder) => ({ title: decodeURI(folder), segment: folder })) ?? [];
  const { uploadFile } = useUploadFile();
  const { renameFile } = useRenameFile({
    objectKey: renameFileModal.objectKey,
  });

  const files = useListFiles({
    folder,
  });

  const uploadFiles = (files: File[]) => {
    setFiles(files);
    setUploadModalIsOpen(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop(acceptedFiles) {
      if (acceptedFiles.length) {
        uploadFiles(acceptedFiles);
      }
    },
    noClick: true,
  });

  const hasFolders = !!files.data?.folders?.length;
  const hasObjects = !!files.data?.objects?.length;

  const foldersData = files.data?.folders ?? [];
  const objectsData = files.data?.objects ?? [];

  const isTruncated = files.data?.isTruncated ?? false;

  return (
    <>
      <div className="min-h-screen pb-24 relative" {...getRootProps()}>
        {isDragActive && (
          <div className="flex flex-col items-center justify-center pointer-events-none bg-zinc-500/25 absolute w-full h-full top-0 left-0 z-50">
            <DocumentArrowUpIcon className="text-zinc-800 size-24 mb-6" />
            <h3 className="text-3xl font-semibold text-zinc-800 uppercase">
              Drop files here
            </h3>
            <p className="mt-1 text-xl text-zinc-700">
              to upload to this folder
            </p>
          </div>
        )}
        <input {...getInputProps({ className: "dropzone" })} />
        <BreadcrumbsTopbar>
          <Breadcrumbs
            basePath="/files"
            crumbs={[{ segment: "/", title: "Files" }, ...crumbs]}
          />
        </BreadcrumbsTopbar>

        {hasFolders || hasObjects ? (
          <div className="p-6">
            {fileLayout === "list" ? (
              <ul className="flex flex-col rounded-lg border border-zinc-200 divide-y divide-zinc-200">
                {foldersData?.map((folder: Folder) => (
                  <FolderRow
                    key={folder.prefix}
                    label={folder.label}
                    onClick={() => router.push(`/files/${folder.prefix}`)}
                  />
                ))}
                {objectsData?.map((object: _Object) => (
                  <FileRow
                    key={object.Key}
                    objectKey={object.Key ?? ""}
                    label={object.Key?.split("/").pop() ?? "File"}
                    bytes={object.Size}
                    extension={
                      object.Key?.split(".").pop()?.toLowerCase() ?? "file"
                    }
                  />
                ))}
              </ul>
            ) : (
              <ul className="grid grid-cols-12 gap-4">
                {foldersData?.map((folder: Folder) => (
                  <FolderCard
                    key={folder.prefix}
                    label={folder.label}
                    onClick={() => router.push(`/files/${folder.prefix}`)}
                  />
                ))}
                {objectsData?.map((object: _Object) => (
                  <FileCard
                    key={object.Key}
                    objectKey={object.Key ?? ""}
                    label={object.Key?.split("/").pop() ?? "File"}
                    bytes={object.Size}
                    extension={
                      object.Key?.split(".").pop()?.toLowerCase() ?? "file"
                    }
                  />
                ))}
              </ul>
            )}
            {files.data.totalPages >= 2 && (
              <div className="mt-6 flex justify-center">
                <PaginationButtons
                  page={Number(page)}
                  pageTotal={files.data.totalPages}
                  setPage={setPage}
                />
              </div>
            )}
          </div>
        ) : null}
        {!isDragActive && !files.isLoading && !hasFolders && !hasObjects && (
          <DocumentsEmptyState
            title="No files yet"
            description="Drag and drop to get started"
          />
        )}
      </div>
      <RenameModal
        handleClose={() => {
          setRenameFileModal({
            isOpen: false,
            objectKey: "",
            name: "",
          });
        }}
        currentName={renameFileModal.objectKey.split("/").pop() ?? ""}
        handleSave={(name) => {
          renameFile(name);
        }}
        isOpen={renameFileModal.isOpen}
      />
    </>
  );
};

export default FilePage;
