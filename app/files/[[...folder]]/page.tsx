"use client";

import {
  Breadcrumbs,
  BreadcrumbsTopbar,
} from "@/app/_components/layout/Breadcrumbs";
import { useListFiles } from "../../_hooks/files/use-list-files";
import { useRouter } from "next/navigation";
import { FolderCard } from "@/app/_components/files/FolderCard";
import { FileCard } from "@/app/_components/files/FileCard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/_context/AppContext";
import { FolderRow } from "@/app/_components/files/FolderRow";
import { FileRow } from "@/app/_components/files/FileRow";
import { Loader } from "@/app/_components/loaders/Loader";
import { useDropzone } from "react-dropzone";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { RenameModal } from "@/app/_components/modals/RenameModal";
import { useRenameFile } from "@/app/_hooks/files/use-rename-file";
import { _Object } from "@aws-sdk/client-s3";
import { UploadContext } from "@/app/_context/UploadContext";
import { DocumentsEmptyState } from "@/app/_components/empty-states/DocumentsEmptyState";
import { PaginationButtons } from "@/app/_components/pagination/PaginationButtons";
import { MoveModal } from "@/app/_components/modals/MoveModal";
import { Folder } from "@/app/_types";
import { useMoveFile } from "@/app/_hooks/files/use-move-file";
import { SessionContext } from "@/app/_context/SessionContext";
import { useListBuckets } from "@/app/_hooks/bucket/use-list-buckets";
import { getProviderLabel } from "@/app/_helpers/buckets/provider-options";
import { Select } from "@/app/_components/form/Select";
import { Button } from "@/app/_components/buttons/Button";
import { PayButton } from "@/app/_components/PayButton/PayButton";
import { PlusIcon } from "@heroicons/react/16/solid";
import { NewFolderModal } from "@/app/_components/modals/NewFolderModal";
import { useCreateFolder } from "@/app/_hooks/files/use-create-folder";
import { Input } from "@/app/_components/form/Input";
import { useDebounce } from "@/app/_hooks/util";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { deleteCookie, getCookie } from "cookies-next";
import { useUpdateWorkspace } from "@/app/_hooks/workspace/use-update-workspace";

const FilePage = () => {
  const {
    fileLayout,
    renameFileModal,
    setRenameFileModal,
    moveFileModal,
    setMoveFileModal,
    setPage,
    page,
  } = useContext(AppContext);
  const router = useRouter();
  const { setFiles, setUploadModalIsOpen } = useContext(UploadContext);
  const { folder } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [orderBy, setOrderBy] = useState("Key");
  const [orderDir, setOrderDir] = useState<"asc" | "desc">("asc");
  const { session, updateSession } = useContext(SessionContext);
  const [newFolderModalIsOpen, setNewFolderModalIsOpen] = useState(false);
  const { updateWorkspace } = useUpdateWorkspace();
  const crumbs =
    folder
      ?.split("/")
      .map((folder) => ({ title: decodeURI(folder), segment: folder })) ?? [];

  const { data: bucketsData, isLoading: bucketsLoading } = useListBuckets({
    workspaceId: session.workspaceId,
  });
  const currentBucket = bucketsData?.buckets?.find(
    (bucket) => bucket._id.toString() === session.bucketId
  );

  const { renameFile } = useRenameFile({
    objectKey: renameFileModal.objectKey,
  });
  const { createFolder } = useCreateFolder();
  const { moveFile } = useMoveFile({
    objectKey: moveFileModal.objectKey,
  });

  const files = useListFiles({
    folder,
    search: debouncedSearch,
    orderBy,
    orderDir,
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

  const foldersData =
    files.data?.folders?.filter((folder: Folder) => !!folder.label) ?? [];
  const objectsData =
    files.data?.objects?.filter(
      (object: _Object) => !!object.Key?.split("/").pop()
    ) ?? [];

  const hasFolders = !!foldersData?.length;
  const hasObjects = !!objectsData?.length;

  const bucketOptions =
    bucketsData?.buckets?.map((bucket) => ({
      value: bucket._id.toString(),
      label: bucket.displayName || getProviderLabel(bucket.provider),
    })) ?? [];

  const getBucketFromOption = (option: { value: string; label: string }) => {
    return bucketsData?.buckets?.find(
      (bucket) => bucket._id.toString() === option.value
    );
  };

  useEffect(() => {
    const upgradeCookie = getCookie("upgrade");
    if (upgradeCookie === "pro") {
      updateWorkspace(session.workspaceId, { plan: "pro" });
      updateSession({ plan: "pro" });
      deleteCookie("upgrade");
    }
  }, [session.workspaceId, updateWorkspace, updateSession]);

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
          <div className="flex items-center justify-between w-full h-[38px]">
            <Breadcrumbs
              basePath="/files"
              crumbs={[{ segment: "/", title: "Files" }, ...crumbs]}
            />
            {currentBucket && session.plan && session.plan !== "free" ? (
              <Select
                value={{
                  value: currentBucket?._id.toString(),
                  label:
                    currentBucket?.displayName ||
                    getProviderLabel(currentBucket?.provider ?? ""),
                }}
                options={bucketOptions}
                onChange={async (option) => {
                  const bucket = getBucketFromOption(option);
                  files.mutate(undefined, { revalidate: false });
                  await updateSession({
                    bucketId: option.value?.toString(),
                    publicDomain: bucket?.publicDomain,
                  });
                  router.push("/files");
                  files.mutate();
                }}
                className="!border-zinc-200 !text-xs hover:!border-zinc-300 cursor-pointer"
              />
            ) : null}
            {session.plan &&
            session.plan !== "free" &&
            !currentBucket &&
            !bucketsLoading ? (
              <Button
                label="Add a Bucket"
                onClick={() => router.push("/settings/buckets")}
                Icon={<PlusIcon className="h-4 w-4" />}
              />
            ) : null}
            {session.plan === "free" || !session.plan ? <PayButton /> : null}
          </div>
        </BreadcrumbsTopbar>

        <div className="flex px-6 mt-6 md:items-center justify-between">
          <div className="w-40 md:w-64 max-w-full pr-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                <MagnifyingGlassIcon className="w-4 h-4 text-zinc-400" />
              </div>

              <Input
                type="search"
                name="search"
                id="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 !border-zinc-300 focus:!border-zinc-500"
              />
            </div>
          </div>
          <div>
            <Button
              label="New Folder"
              Icon={<PlusIcon className="h-4 w-4" />}
              onClick={() => {
                setNewFolderModalIsOpen(true);
              }}
            />
          </div>
        </div>
        {hasFolders || hasObjects ? (
          <div className="px-6 mt-4">
            {fileLayout === "list" ? (
              <ul className="flex flex-col rounded-lg border border-zinc-200 divide-y divide-zinc-200">
                {(!page || page === "1") &&
                  foldersData?.map((folder: Folder) => (
                    <FolderRow
                      key={folder.prefix}
                      label={folder.label}
                      prefix={folder.prefix}
                      onClick={() => router.push(`/files/${folder.prefix}`)}
                    />
                  ))}
                {objectsData?.map(
                  (object: _Object & { url: string; thumbnail?: string }) => (
                    <FileRow
                      key={object.Key}
                      objectKey={object.Key ?? ""}
                      label={object.Key?.split("/").pop() ?? "File"}
                      bytes={object.Size}
                      extension={
                        object.Key?.split(".").pop()?.toLowerCase() ?? "file"
                      }
                      publicDomain={session.publicDomain}
                      objectUrl={object.url}
                      bucketName={currentBucket?.name}
                      thumbnailUrl={object.thumbnail}
                    />
                  )
                )}
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
                    publicDomain={session.publicDomain}
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
        {files.isLoading && (
          <div className="flex items-center justify-center h-48">
            <Loader size={24} />
          </div>
        )}
        {!isDragActive && !files.isLoading && !hasFolders && !hasObjects && (
          <DocumentsEmptyState
            title={
              session.bucketId ? "No files yet" : "Add a bucket to view files"
            }
            description={
              session.bucketId
                ? "Drag and drop to get started"
                : "Go to settings and add a bucket"
            }
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
      <MoveModal
        handleClose={() => {
          setMoveFileModal({
            isOpen: false,
            objectKey: "",
          });
        }}
        currentObjectKey={moveFileModal.objectKey}
        handleSave={(folderName) => {
          moveFile(folderName);
        }}
        isOpen={moveFileModal.isOpen}
      />
      <NewFolderModal
        isOpen={newFolderModalIsOpen}
        handleClose={() => {
          setNewFolderModalIsOpen(false);
        }}
        handleSave={(name) => {
          createFolder(name);
        }}
      />
    </>
  );
};

export default FilePage;
