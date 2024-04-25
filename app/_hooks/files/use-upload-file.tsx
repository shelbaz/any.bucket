import { useListObjects } from "@/app/_helpers/s3/objects";
import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";

export const useUploadFile = ({ folder }: { folder?: string }) => {
  const objects = useListObjects({ folder });
  const fetcher = useFetcher();

  const uploadFile = async (file: File) => {
    if (!file) return;
    const fileName = file.name;
    const presignedUrl = await fetcher("/api/s3/objects/presign", {
      method: "POST",
      body: JSON.stringify({
        fileName,
        folder: folder ? decodeURI(folder) : undefined,
      }),
    });

    const uploadResponse = await fetch(presignedUrl.url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    if (uploadResponse) {
      toast.success("File uploaded successfully");
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
      return;
    }

    toast.error("Failed to upload file");
  };

  return {
    uploadFile,
  };
};
