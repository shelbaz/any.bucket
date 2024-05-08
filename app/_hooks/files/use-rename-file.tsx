import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";
import { useListFiles } from "@/app/_hooks/files/use-list-files";
import { useContext } from "react";
import { AppContext } from "@/app/_context/AppContext";

export const useRenameFile = ({ objectKey }: { objectKey: string }) => {
  const fetcher = useFetcher();
  const { folder } = useContext(AppContext);
  const files = useListFiles({ folder });

  const renameFile = async (newName: string) => {
    const newObjectsData = [...(files.data?.objects ?? [])].map(
      (object: _Object) => {
        if (object.Key === objectKey) {
          const oldFolder = objectKey.split("/").slice(0, -1).join("/");

          object.Key = oldFolder ? `${oldFolder}/${newName}` : newName;
        }
        return object;
      }
    );

    const oldFolder = objectKey.split("/").slice(0, -1).join("/");

    const toastId = toast.loading("Renaming file...");
    try {
      await fetcher("/api/s3/objects/rename", {
        method: "PUT",
        data: {
          oldKey: objectKey,
          newKey: oldFolder ? `${oldFolder}/${newName}` : newName,
        },
      });

      files.mutate(
        { ...files.data, objects: newObjectsData },
        { revalidate: false }
      );
      toast.success("File renamed successfully", { id: toastId });
    } catch (e) {
      console.log("ERROR:", e);
      toast.error("Failed to rename file", { id: toastId });
    }
  };

  return {
    renameFile,
  };
};
