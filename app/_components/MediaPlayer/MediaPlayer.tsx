"use client";

import { MediaContext } from "@/app/_context/MediaContext";
import { getFileTypeFromExtension } from "@/app/_helpers/files";
import { XCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { EpubReader } from "./EpubReader";
import { PdfReader } from "./PdfReader";
import { useListObjects } from "@/app/_helpers/s3/objects";
import { AppContext } from "@/app/_context/AppContext";
import { _Object } from "@aws-sdk/client-s3";

const getSizeClassesFromExt = (ext: string) => {
  switch (ext.toLocaleLowerCase()) {
    case "mp4":
    case "avi":
    case "mov":
    case "mkv":
    case "gif":
      return "max-w-1/2 w-full min-w-60";
    case "mp3":
    case "wav":
    case "flac":
      return "";
    case "png":
    case "jpg":
    case "jpeg":
    case "svg":
      return "max-w-1/2 w-[40vw] min-w-60 max-h-[80vh]";
    case "epub":
      return "w-full h-full lg:w-[75vw] lg:h-[90vh] z-50";
    case "pdf":
      return "w-full h-full lg:w-[611px] lg:h-[791px] z-50";
    default:
      return "";
  }
};

export const MediaPlayer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    mediaFile,
    setMediaFile,
    setIsPlaying,
    isPlaying,
    isFullScreen,
    setFullScreen,
    mediaRef,
    close,
  } = useContext(MediaContext);
  const { folder } = useContext(AppContext);
  const objects = useListObjects({ folder });
  const objectsData: _Object[] = useMemo(
    () => objects.data?.objects ?? [],
    [objects]
  );

  useHotkeys("ESC", () => {
    if (mediaFile) {
      close();
    }
  });

  useHotkeys(
    "up",
    (e) => {
      if (!mediaFile) return;
      e.preventDefault();
      loadPreviousFile();
    },
    [mediaFile]
  );

  useHotkeys(
    "down",
    (e) => {
      if (!mediaFile) return;
      e.preventDefault();
      loadNextFile();
    },
    [mediaFile]
  );

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1);
  }, [mediaFile]);

  if (!mediaFile || isLoading) {
    return null;
  }

  const loadPreviousFile = (type?: string) => {
    const filteredObjects = objectsData.filter((obj) => {
      if (!type) return true;
      const ext = obj.Key?.split(".").pop()?.toLowerCase();
      const fileType = getFileTypeFromExtension(ext ?? "");
      return fileType === type;
    });
    const currentIndex = filteredObjects.findIndex(
      (obj) => obj.Key === mediaFile
    );
    const previousIndex = currentIndex - 1;
    const previousFile = filteredObjects[previousIndex]?.Key;

    if (previousFile) {
      setMediaFile(previousFile);
    }
  };

  const loadNextFile = (type?: string) => {
    const filteredObjects = objectsData.filter((obj) => {
      if (!type) return true;
      const ext = obj.Key?.split(".").pop()?.toLowerCase();
      const fileType = getFileTypeFromExtension(ext ?? "");
      return fileType === type;
    });
    const currentIndex = filteredObjects.findIndex(
      (obj) => obj.Key === mediaFile
    );
    const nextIndex = currentIndex + 1;
    const nextFile = filteredObjects[nextIndex]?.Key;

    if (nextFile) {
      setMediaFile(nextFile);
    }
  };

  const extension = mediaFile.split(".").pop()?.toLowerCase() ?? "";

  const fileType = getFileTypeFromExtension(extension);
  const fileUrl = `${process.env.NEXT_PUBLIC_S3_DOMAIN}/${mediaFile}`;

  return (
    <div
      className={clsx(
        "group fixed bottom-0 right-0 lg:bottom-6 lg:right-6 bg-black lg:rounded overflow-hidden",
        getSizeClassesFromExt(extension)
      )}
      style={{
        boxShadow:
          "0 0 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      {fileType === "audio" && mediaFile && (
        <div className="w-96 h-auto">
          <div className="aspect-square flex items-center justify-center text-white">
            {mediaFile?.split("/").pop() ?? "File"}
          </div>
          <div className="px-4 py-4 flex items-center bg-white/10">
            <audio
              id="audio-elemen t"
              ref={mediaRef as MutableRefObject<HTMLAudioElement>}
              controls
              controlsList="nofullscreen nodownload"
              src={fileUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => loadNextFile("audio")}
              autoPlay
              className="w-full h-8"
            />
          </div>
        </div>
      )}
      {fileType === "video" && (
        <video
          ref={mediaRef as MutableRefObject<HTMLVideoElement>}
          className="w-full h-auto"
          controls
          controlsList="nodownload"
          src={fileUrl}
          autoPlay
        />
      )}
      {fileType === "image" && (
        <img
          src={fileUrl}
          alt={mediaFile}
          className="w-full h-full object-contain object-center"
        />
      )}
      {fileType === "pdf" && <PdfReader file={fileUrl} />}
      {extension === "epub" && (
        <EpubReader fileUrl={fileUrl} objectKey={mediaFile} />
      )}

      <div
        className="group-hover:opacity-100 opacity-100 sm:opacity-0 duration-100 absolute top-5 left-auto right-5 lg:left-5 lg:right-auto rounded-full h-6 w-6 bg-black cursor-pointer flex items-center justify-center z-10"
        onClick={() => {
          close();
        }}
        title="Close"
      >
        <XCircleIcon className="h-6 w-6 text-white hover:opacity-90" />
      </div>
    </div>
  );
};
