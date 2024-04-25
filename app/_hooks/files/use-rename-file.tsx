import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";

export const useRenameFile = ({ objectKey }: { objectKey: string }) => {
  const fetcher = useFetcher();

  const renameFile = async (newName: string) => {
    try {
      const response = await fetcher("/api/s3/objects/rename", {
        method: "PUT",
        body: JSON.stringify({
          oldKey: objectKey,
          newKey: objectKey.split("/").slice(0, -1).join("/") + "/" + newName,
        }),
      });

      if (response) {
        toast.success("File renamed successfully");
        return;
      } else {
        toast.error("Failed to rename file");
      }
    } catch (error) {
      toast.error("Failed to rename file");
    }
  };

  return {
    renameFile,
  };
};
