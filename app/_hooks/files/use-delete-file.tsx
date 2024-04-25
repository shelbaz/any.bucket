import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";

export const useDeleteFile = ({ objectKey }: { objectKey: string }) => {
  const fetcher = useFetcher();

  const deleteFile = async () => {
    try {
      const response = await fetcher("/api/s3/objects/delete", {
        method: "DELETE",
        body: JSON.stringify({
          key: objectKey,
        }),
      });

      if (response.ok) {
        toast.success("File deleted successfully");
        return;
      }
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };

  return {
    deleteFile,
  };
};
