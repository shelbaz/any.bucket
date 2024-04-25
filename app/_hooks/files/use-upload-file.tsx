import { useListObjects } from "@/app/_helpers/s3/objects";
import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";

export const useUploadFile = ({ folder }: { folder?: string }) => {
  const { setObjects } = useListObjects({ folder });
  const fetcher = useFetcher();

  const uploadFile = async (file: File) => {
    if (!file) return;
    const fileName = file.name;
    const response = await fetcher("/api/s3/objects/presign", {
      method: "POST",
      body: JSON.stringify({
        fileName,
        folder: folder ? decodeURI(folder) : undefined,
      }),
    });
    const presignedUrl = await response.json();

    const uploadResponse = await fetch(presignedUrl.url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    if (uploadResponse.ok) {
      toast.success("File uploaded successfully");
      setObjects((prev) => [
        ...(prev ?? []),
        {
          Key: `${folder ? `${decodeURI(folder)}/` : ""}${fileName}`,
          Size: file.size,
        } as _Object,
      ]);
      return;
    }

    toast.error("Failed to upload file");
  };

  return {
    uploadFile,
  };
};
