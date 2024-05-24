import {
  getEmojiFromExtension,
  getFileTypeFromExtension,
  getSize,
} from "@/app/_helpers/files";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

interface Props {
  objectKey: string;
  onClick?: () => void;
  label?: string;
  bytes?: number;
  extension: string;
  publicDomain: string;
}

export const FileCard = ({
  onClick,
  objectKey,
  label,
  bytes,
  extension,
  publicDomain,
}: Props) => {
  const fileType = getFileTypeFromExtension(extension);
  const noFilePreview = !["image", "audio"].includes(fileType);

  return (
    <li
      className="group col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-lg duration-100 shadow-none hover:shadow-md h-full border border-zinc-200 overflow-hidden">
        <div className="absolute top-3 right-3 hover:bg-zinc-100 text-zinc-500 hover:text-black h-6 w-6 justify-center items-center flex rounded cursor-pointer">
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex justify-center items-center aspect-square">
          {fileType === "image" && (
            <div className="w-full h-full relative">
              <Image
                src={`${publicDomain}/${objectKey}`}
                objectFit="cover"
                alt={label ?? objectKey}
                fill
                unoptimized
              />
            </div>
          )}

          {fileType === "audio" && (
            <div className="flex justify-center items-center w-full h-full">
              <audio controls controlsList="nofullscreen nodownload">
                <source src={`${publicDomain}/${objectKey}`} />
              </audio>
            </div>
          )}

          {noFilePreview && (
            <span className="text-7xl">{getEmojiFromExtension(extension)}</span>
          )}
        </div>
        <div className="flex flex-shrink flex-col py-2 px-3 border-t border-zinc-200 text-black">
          <span
            className="text-sm font-medium group-hover:opacity-75 line-clamp-1"
            title={label}
          >
            {label}
          </span>
          <span className="text-tiny mt-1 text-zinc-600">
            {getSize(bytes ?? 0)}
          </span>
        </div>
      </div>
    </li>
  );
};
