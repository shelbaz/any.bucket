import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";
import { useListFiles } from "@/app/_hooks/files/use-list-files";
import { useContext } from "react";
import { AppContext } from "@/app/_context/AppContext";

export const useDeleteFile = ({ objectKey }: { objectKey: string }) => {
  const { folder, page, pageSize } = useContext(AppContext);
  const fetcher = useFetcher();
  const files = useListFiles({ folder });

  const deleteFile = async () => {
    try {
      await fetcher("/api/s3/objects/delete", {
        method: "DELETE",
        data: {
          key: objectKey,
        },
      });

      toast.success("File deleted");
      const newObjectsData = [...(files.data?.objects ?? [])].filter(
        (object: _Object) => {
          return object.Key !== objectKey;
        }
      );
      files.mutate(
        { ...files.data, objects: newObjectsData },
        { revalidate: false }
      );
      return;
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };

  return {
    deleteFile,
  };
};
