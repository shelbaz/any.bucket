import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";
import { useListFiles } from "@/app/_hooks/files/use-list-files";
import { useContext } from "react";
import { AppContext } from "@/app/_context/AppContext";

export const useMoveFile = ({ objectKey }: { objectKey: string }) => {
  const fetcher = useFetcher();
  const { folder } = useContext(AppContext);
  const files = useListFiles({ folder });
  const objectName = objectKey.split("/").pop();

  const moveFile = async (newFolder: string) => {
    const oldFileData = files.data;
    const newObjectsData = [...(files.data?.objects ?? [])].filter((object) => {
      return object.Key !== objectKey;
    });

    files.mutate(
      { ...files.data, objects: newObjectsData },
      { revalidate: false }
    );

    try {
      await fetcher("/api/s3/objects/rename", {
        method: "PUT",
        data: {
          oldKey: objectKey,
          newKey: newFolder ? `${newFolder}/${objectName}` : objectName,
        },
      });
      toast.success(`Moved to ${newFolder || "/"}`);
    } catch (e) {
      console.log("ERROR:", e);
      files.mutate(oldFileData, { revalidate: true });
      toast.error("Failed to rename file");
    }
  };

  return {
    moveFile,
  };
};
