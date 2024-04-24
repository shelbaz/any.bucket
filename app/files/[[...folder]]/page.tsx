"use client";

import { Breadcrumbs } from "@/app/_components/layout/Breadcrumbs";
import { useListObjects } from "../../_helpers/s3/objects";
import { useRouter, useParams } from "next/navigation";
import { FolderCard } from "@/app/_components/files/FolderCard";
import { FileCard } from "@/app/_components/files/FileCard";
import { useContext } from "react";
import { AppContext } from "@/app/_context/AppContext";
import { FolderRow } from "@/app/_components/files/FolderRow";
import { FileRow } from "@/app/_components/files/FileRow";
import { RocksLoader } from "@/app/_components/loaders/RocksLoader";
import { useDropzone } from "react-dropzone";
import { useUploadFile } from "@/app/_hooks/files";
import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";

const FilePage = () => {
  const { fileLayout } = useContext(AppContext);
  const router = useRouter();
  const params = useParams();
  const folder =
    typeof params.folder === "object" ? params.folder.join("/") : params.folder;
  const crumbs =
    folder
      ?.split("/")
      .map((folder) => ({ title: decodeURI(folder), segment: folder })) ?? [];
  const { uploadFile } = useUploadFile({ folder });

  const { objects, folders, loadMore, isTruncated, isLoading } = useListObjects(
    {
      folder,
    }
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop(acceptedFiles, fileRejections, event) {
      if (acceptedFiles.length) {
        uploadFile(acceptedFiles[0]);
      }
    },
    noClick: true,
  });

  const hasFolders = !!folders?.length;
  const hasObjects = !!objects?.length;

  return (
    <div className="min-h-screen pb-24 relative" {...getRootProps()}>
      {isDragActive && (
        <div className="flex flex-col items-center justify-center pointer-events-none bg-zinc-500/25 absolute w-full h-full top-0 left-0 z-50">
          <ArrowUpTrayIcon className="text-zinc-800 size-56 mb-4" />
          <p className="text-3xl font-semibold text-zinc-700">
            Drop files to upload in this folder
          </p>
        </div>
      )}
      <input {...getInputProps({ className: "dropzone" })} />
      <div className="flex items-center py-2 px-3 border-t border-b border-zinc-200">
        <Breadcrumbs
          basePath="/files"
          crumbs={[{ segment: "/", title: "Files" }, ...crumbs]}
        />
      </div>

      {hasFolders || hasObjects ? (
        <div className="p-6">
          {fileLayout === "list" ? (
            <ul className="flex flex-col rounded-lg border border-zinc-200 divide-y divide-zinc-200">
              {folders?.map((folder) => (
                <FolderRow
                  key={folder.prefix}
                  label={folder.label}
                  onClick={() => router.push(`/files/${folder.prefix}`)}
                />
              ))}
              {objects?.map((object) => (
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
              {folders?.map((folder) => (
                <FolderCard
                  key={folder.prefix}
                  label={folder.label}
                  onClick={() => router.push(`/files/${folder.prefix}`)}
                />
              ))}
              {objects?.map((object) => (
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
        </div>
      ) : null}
      <div className="flex items-center justify-center h-24">
        {!isLoading && !!folders && !!objects && isTruncated ? (
          <div
            onClick={loadMore}
            className="border border-black rounded py-2 px-3 cursor-pointer hover:opacity-80 duration-100"
          >
            Load more
          </div>
        ) : null}
        {(isLoading || !objects) && <RocksLoader />}
      </div>
    </div>
  );
};

export default FilePage;
