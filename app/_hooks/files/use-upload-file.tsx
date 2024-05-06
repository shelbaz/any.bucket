import { useListFiles } from "@/app/_hooks/files/use-list-files";
import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";
import { dataUrlToFile } from "@/app/_helpers/files/download-file";
import { useContext } from "react";
import { AppContext } from "@/app/_context/AppContext";

export const useUploadFile = () => {
  const { folder } = useContext(AppContext);
  const objects = useListFiles({ folder });
  const fetcher = useFetcher();

  function uploadS3(
    url: string,
    file: File,
    onProgressUpdate?: (progress: number) => void
  ) {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr);
          } else {
            reject(xhr);
          }
        }
      };

      if (onProgressUpdate) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            var percentComplete = (e.loaded / file.size) * 100;
            onProgressUpdate(percentComplete);
          }
        };
      }

      xhr.open("PUT", url);
      xhr.send(file);
    });
  }

  const uploadFile = async (
    file: File,
    onProgressUpdate?: (progress: number) => void
  ) => {
    if (!file) return;
    const fileName = file.name;

    try {
      const presignedUrl = await fetcher("/api/s3/objects/presign", {
        method: "POST",
        data: {
          fileName,
          folder: folder ? decodeURI(folder) : undefined,
        },
      });

      try {
        const uploadResponse = await uploadS3(
          presignedUrl.url,
          file,
          onProgressUpdate
        );
        if (uploadResponse) {
          const uploadedObject: _Object = {
            Key: fileName,
            Size: file.size,
            LastModified: new Date(),
          };
          const newObjectsData = objects.data?.objects
            ? [...objects.data.objects, uploadedObject]
            : [uploadedObject];
          objects.mutate(
            { ...objects.data, objects: newObjectsData },
            { revalidate: false }
          );
          onProgressUpdate?.(100);
          return;
        }

        toast.error("Failed to upload file");
      } catch (e) {
        toast.error("Failed to upload file");
      }
    } catch (e) {
      toast.error("Failed to upload file");
    }
  };

  const uploadB64Image = async (
    dataUrl: string,
    fileName: string,
    onProgressUpdate?: (progress: number) => void
  ) => {
    const file = dataUrlToFile(dataUrl, fileName);
    if (!file) {
      toast.error("Failed to convert data URL to file");
      return;
    }

    uploadFile(file, onProgressUpdate);
  };

  return {
    uploadFile,
    uploadB64Image,
  };
};
