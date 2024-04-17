import {
  getEmojiFromExtension,
  getFileTypeFromExtension,
  getSize,
} from "@/app/_helpers/files";
import { useHandleFileClick } from "@/app/_hooks/files";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { url } from "inspector";
import Image from "next/image";

interface Props {
  objectKey: string;
  label?: string;
  bytes?: number;
  extension: string;
}

export const FileRow = ({ objectKey, label, bytes, extension }: Props) => {
  const fileType = getFileTypeFromExtension(extension);
  const noFilePreview = !["image", "audio"].includes(fileType);
  const handleFileClick = useHandleFileClick(objectKey, fileType);

  return (
    <li
      className="group col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 cursor-pointer"
      onClick={handleFileClick}
    >
      <div className="relative px-3 py-2">
        <div>
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <span className="flex items-center mr-3">
                {fileType === "image" && (
                  <div className="w-6 h-6 relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}/${objectKey}`}
                      objectFit="cover"
                      alt={label ?? objectKey}
                      fill
                    />
                  </div>
                )}

                {fileType === "audio" && (
                  <div className="flex justify-center items-center h-6 w-6">
                    <audio
                      controls
                      controlsList="nofullscreen nodownload"
                      className="hidden"
                    >
                      <source
                        src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}/${objectKey}`}
                      />
                    </audio>
                  </div>
                )}

                {noFilePreview && (
                  <span className="text-xl">
                    {getEmojiFromExtension(extension)}
                  </span>
                )}
              </span>
              <span className="text-sm font-medium group-hover:opacity-70">
                {label}
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
