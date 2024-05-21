import { MediaContext } from "@/app/_context/MediaContext";
import {
  downloadFile,
  getEmojiFromExtension,
  getFileTypeFromExtension,
  getSize,
} from "@/app/_helpers/files";
import { useHandleFileClick } from "@/app/_hooks/files";
import { useDeleteFile } from "@/app/_hooks/files/use-delete-file";
import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Image from "next/image";
import { useContext } from "react";
import { MoreButton } from "../../buttons/MoreButton";
import { MoreButtonOption } from "../../buttons/MoreButton/MoreButton";
import { AppContext } from "@/app/_context/AppContext";
import { confirm } from "../../modals/ConfirmModal/ConfirmModal";
import toast from "react-hot-toast";

interface Props {
  objectKey: string;
  label?: string;
  bytes?: number;
  extension: string;
  publicDomain: string;
  objectUrl: string;
}

export const FileRow = ({
  objectKey,
  label,
  bytes,
  extension,
  publicDomain,
  objectUrl,
}: Props) => {
  const { setRenameFileModal, renameFileModal, setMoveFileModal } =
    useContext(AppContext);
  const { mediaRef, mediaFile } = useContext(MediaContext);
  const fileType = getFileTypeFromExtension(extension);
  const noFilePreview = !["image", "audio", "video"].includes(fileType);
  const handleFileClick = useHandleFileClick(objectKey, fileType);

  const { deleteFile } = useDeleteFile({ objectKey });

  const fileUrl = objectUrl || `${publicDomain}/${objectKey}`;

  const options: MoreButtonOption[] = [
    {
      label: "Copy link",
      action: async () => {
        const toastId = toast.loading("Copying");
        await navigator.clipboard.writeText(fileUrl);

        toast.success("Link copied to clipboard", { id: toastId });
      },
    },
    {
      label: "Download",
      action: () => {
        downloadFile(fileUrl);
      },
    },
    {
      label: "Rename",
      action: () => {
        setRenameFileModal({
          ...renameFileModal,
          isOpen: true,
          objectKey,
        });
      },
    },
    {
      label: "Move to folder",
      action: () => {
        setMoveFileModal({
          isOpen: true,
          objectKey,
        });
      },
    },
    {
      label: "Delete",
      action: async () => {
        const shouldDelete = await confirm(
          "Are you sure you want to delete this file?",
          {
            confirmText: "Delete",
            cancelText: "Cancel",
          }
        );

        if (shouldDelete) {
          deleteFile();
        }
      },
    },
  ];

  const isSelected = objectKey === mediaFile;
  const isPlaying = !mediaRef?.current?.paused && isSelected;

  if (!label) return null;

  return (
    <li
      className={clsx(
        "group first:rounded-t-lg last:rounded-b-lg col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 cursor-pointer hover:bg-zinc-50",
        isSelected ? "bg-zinc-50" : "bg-white"
      )}
      onClick={handleFileClick}
    >
      <div className="relative p-2.5">
        <div>
          <div className="flex items-center justify-between">
            <span className="flex items-center line-clamp-1">
              <span className="flex justify-center items-center mr-3">
                {fileType === "image" && (
                  <div className="w-8 h-8 bg-zinc-100 relative overflow-hidden rounded">
                    <Image
                      src={fileUrl}
                      alt={label ?? objectKey}
                      fill
                      className={
                        extension === "svg" ? "object-contain" : "object-cover"
                      }
                      sizes="(max-width: 64px), 64px"
                    />
                  </div>
                )}

                {fileType === "audio" && (
                  <div className="flex justify-center items-center bg-zinc-100 rounded h-8 w-8">
                    {isPlaying ? (
                      <PauseIcon className="h5 w-5 text-zinc-500" />
                    ) : (
                      <PlayIcon className="h-5 w-5 text-zinc-500" />
                    )}
                  </div>
                )}
                {fileType === "video" && (
                  <div className="flex justify-center items-center h-8 w-8 bg-zinc-100 overflow-hidden rounded">
                    <video
                      controls={false}
                      preload="metadata"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    >
                      <source src={`${fileUrl}#t=0.8`} type="video/mp4" />
                    </video>
                  </div>
                )}

                {noFilePreview && (
                  <span className="text-xl h-8 w-8 text-center bg-zinc-100 rounded">
                    {getEmojiFromExtension(extension)}
                  </span>
                )}
              </span>
              <span
                className="text-zinc-900 flex text-sm font-medium group-hover:text-black"
                title={label}
              >
                {label}
              </span>
            </span>
            <div className="flex items-center space-x-3">
              <span className="text-tiny text-zinc-500">
                {getSize(bytes ?? 0)}
              </span>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <MoreButton options={options} position="left" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
