import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";

export const useRenameFile = ({ objectKey }: { objectKey: string }) => {
  const renameFile = async (newName: string) => {
    try {
      const response = await fetch("/api/s3/objects/rename", {
        method: "PUT",
        body: JSON.stringify({
          oldKey: objectKey,
          newKey: objectKey.split("/").slice(0, -1).join("/") + "/" + newName,
        }),
      });

      if (response.ok) {
        toast.success("File renamed successfully");
        return;
      }
    } catch (error) {
      toast.error("Failed to rename file");
    }
  };

  return {
    renameFile,
  };
};
