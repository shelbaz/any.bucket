import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const getFileTypeFromExtension = (extension: string) => {
  switch (extension) {
    case "pdf":
    case "doc":
    case "docx":
      return "document";
    case "xls":
    case "xlsx":
    case "ppt":
    case "pptx":
      return "spreadsheet";
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return "image";
    case "mp4":
    case "avi":
    case "mov":
    case "mkv":
      return "video";
    case "mp3":
    case "wav":
    case "flac":
      return "audio";
    default:
      return "file";
  }
};

const getEmojiFromExtension = (extension: string) => {
  switch (extension) {
    case "pdf":
    case "doc":
    case "docx":
      return "📄";
    case "xls":
    case "xlsx":
    case "ppt":
    case "pptx":
      return "📊";
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return "🖼️";
    case "mp4":
    case "avi":
    case "mov":
    case "mkv":
      return "🎥";
    case "mp3":
    case "wav":
    case "flac":
      return "🎵";
    default:
      return "📄";
  }
};

const getSize = (bytes: number) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
};

interface Props {
  objectKey: string;
  onClick?: () => void;
  label?: string;
  bytes?: number;
  extension: string;
}

export const FileCard = ({
  onClick,
  objectKey,
  label,
  bytes,
  extension,
}: Props) => {
  const fileType = getFileTypeFromExtension(extension);
  const noFilePreview = !["image", "audio"].includes(fileType);

  return (
    <li
      className="group col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-lg duration-100 shadow-none hover:shadow-md h-full border border-gray-200 overflow-hidden">
        <div className="absolute top-3 right-3 hover:bg-gray-100 text-gray-500 hover:text-black h-6 w-6 justify-center items-center flex rounded cursor-pointer">
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex justify-center items-center aspect-square">
          {fileType === "image" && (
            <div className="w-full h-full relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}/${objectKey}`}
                objectFit="cover"
                alt={label ?? objectKey}
                fill
              />
            </div>
          )}

          {fileType === "audio" && (
            <div className="flex justify-center items-center w-full h-full">
              <audio controls controlsList="nofullscreen nodownload">
                <source
                  src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}/${objectKey}`}
                />
              </audio>
            </div>
          )}

          {noFilePreview && (
            <span className="text-7xl">{getEmojiFromExtension(extension)}</span>
          )}
        </div>
        <div className="flex flex-shrink flex-col py-2 px-3 border-t border-gray-200 text-black">
          <span
            className="text-sm font-medium group-hover:opacity-75 line-clamp-1"
            title={label}
          >
            {label}
          </span>
          <span className="text-tiny mt-1 text-gray-600">
            {getSize(bytes ?? 0)}
          </span>
        </div>
      </div>
    </li>
  );
};
