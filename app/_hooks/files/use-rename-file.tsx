import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";
import { useListFiles } from "@/app/_hooks/files/use-list-files";
import { useContext } from "react";
import { AppContext } from "@/app/_context/AppContext";

export const useRenameFile = ({ objectKey }: { objectKey: string }) => {
  const fetcher = useFetcher();
  const { folder } = useContext(AppContext);
  const objects = useListFiles({ folder });

  const renameFile = async (newName: string) => {
    try {
      const newObjectsData = [...(objects.data?.objects ?? [])].map(
        (object: _Object) => {
          if (object.Key === objectKey) {
            const oldFolder = objectKey.split("/").slice(0, -1).join("/");

            object.Key = oldFolder ? `${oldFolder}/${newName}` : newName;
          }
          return object;
        }
      );

      objects.mutate(
        { ...objects.data, objects: newObjectsData },
        { revalidate: false }
      );

      const oldFolder = objectKey.split("/").slice(0, -1).join("/");

      try {
        const response = await fetcher("/api/s3/objects/rename", {
          method: "PUT",
          body: JSON.stringify({
            oldKey: objectKey,
            newKey: oldFolder ? `${oldFolder}/${newName}` : newName,
          }),
        });
        toast.success("File renamed successfully");
      } catch (e) {
        toast.error("Failed to rename file");
      }
    } catch (e) {
      toast.error("Failed to rename file");
    }
  };

  return {
    renameFile,
  };
};
