import { MediaContext } from "@/app/_context/MediaContext";
import {
  getEmojiFromExtension,
  getFileTypeFromExtension,
  getSize,
} from "@/app/_helpers/files";
import { useHandleFileClick } from "@/app/_hooks/files";
import {
  EllipsisHorizontalIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { useContext } from "react";

interface Props {
  objectKey: string;
  label?: string;
  bytes?: number;
  extension: string;
}

export const FileRow = ({ objectKey, label, bytes, extension }: Props) => {
  const { audioRef, mediaFile, pause } = useContext(MediaContext);
  const fileType = getFileTypeFromExtension(extension);
  const noFilePreview = !["image", "audio", "video"].includes(fileType);
  const handleFileClick = useHandleFileClick(objectKey, fileType);
  const fileUrl = `${process.env.NEXT_PUBLIC_S3_DOMAIN}/${objectKey}`;

  return (
    <li
      className="group col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 cursor-pointer"
      onClick={handleFileClick}
    >
      <div className="relative px-3 py-2">
        <div>
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <span className="flex justify-center items-center mr-3">
                {fileType === "image" && (
                  <div className="w-8 h-8 bg-gray-100 relative overflow-hidden rounded">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}/${objectKey}`}
                      objectFit="cover"
                      alt={label ?? objectKey}
                      fill
                    />
                  </div>
                )}

                {fileType === "audio" && (
                  <div className="flex justify-center items-center bg-gray-100 rounded h-8 w-8">
                    {!audioRef?.current?.paused && objectKey === mediaFile ? (
                      <PauseIcon className="h5 w-5 text-gray-500" />
                    ) : (
                      <PlayIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                )}
                {fileType === "video" && (
                  <div className="flex justify-center items-center h-8 w-8 bg-gray-100 overflow-hidden rounded">
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
                  <span className="text-xl h-8 w-8 text-center bg-gray-100 rounded">
                    {getEmojiFromExtension(extension)}
                  </span>
                )}
              </span>
              <span className="text-sm font-medium group-hover:opacity-70">
                {label || <span className="opacity-50">(untitled file)</span>}
              </span>
            </span>
            <div className="flex items-center space-x-3">
              <span className="text-tiny text-gray-500">
                {getSize(bytes ?? 0)}
              </span>
              <div className="hover:bg-gray-100 text-gray-500 hover:text-black h-6 w-6 justify-center items-center flex rounded cursor-pointer">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
