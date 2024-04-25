import { MediaContext } from "@/app/_context/MediaContext";
import {
  downloadFile,
  getEmojiFromExtension,
  getFileTypeFromExtension,
  getSize,
} from "@/app/_helpers/files";
import { useHandleFileClick } from "@/app/_hooks/files";
import { useDeleteFile } from "@/app/_hooks/files/use-delete-file";
import {
  EllipsisHorizontalIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Image from "next/image";
import { useContext } from "react";
import { MoreButton } from "../../buttons/MoreButton";
import { MoreButtonOption } from "../../buttons/MoreButton/MoreButton";
import toast from "react-hot-toast";
import { useRenameFile } from "@/app/_hooks/files/use-rename-file";
import { AppContext } from "@/app/_context/AppContext";

interface Props {
  objectKey: string;
  label?: string;
  bytes?: number;
  extension: string;
}

export const FileRow = ({ objectKey, label, bytes, extension }: Props) => {
  const { setRenameFileModal, renameFileModal } = useContext(AppContext);
  const { mediaRef, mediaFile } = useContext(MediaContext);
  const fileType = getFileTypeFromExtension(extension);
  const noFilePreview = !["image", "audio", "video"].includes(fileType);
  const handleFileClick = useHandleFileClick(objectKey, fileType);

  const { deleteFile } = useDeleteFile({ objectKey });

  const options: MoreButtonOption[] = [
    {
      label: "Download",
      action: () => {
        downloadFile(`${process.env.NEXT_PUBLIC_S3_DOMAIN}/${objectKey}`);
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
      label: "Delete",
      action: deleteFile,
    },
  ];

  const fileUrl = `${process.env.NEXT_PUBLIC_S3_DOMAIN}/${objectKey}`;
  const isSelected = objectKey === mediaFile;
  const isPlaying = !mediaRef?.current?.paused && isSelected;

  return (
    <li
      className={clsx(
        "group first:rounded-t-lg last:rounded-b-lg col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 cursor-pointer hover:bg-zinc-50",
        isSelected ? "bg-zinc-50" : "bg-white"
      )}
      onClick={handleFileClick}
    >
      <div className="relative px-3 py-2">
        <div>
          <div className="flex items-center justify-between">
            <span className="flex items-center line-clamp-1">
              <span className="flex justify-center items-center mr-3">
                {fileType === "image" && (
                  <div className="w-8 h-8 bg-zinc-100 relative overflow-hidden rounded">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}/${objectKey}`}
                      objectFit={extension === "svg" ? "contain" : "cover"}
                      alt={label ?? objectKey}
                      fill
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
                {label || <span className="opacity-50">(untitled file)</span>}
              </span>
            </span>
            <div className="flex items-center space-x-3">
              <span className="text-tiny text-zinc-500">
                {getSize(bytes ?? 0)}
              </span>
              {/* <div className="hover:bg-zinc-100 text-zinc-500 hover:text-black h-6 w-6 justify-center items-center flex rounded cursor-pointer">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </div> */}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <MoreButton options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
