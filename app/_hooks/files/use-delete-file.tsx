import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";
import { useListObjects } from "@/app/_helpers/s3/objects";
import { useContext } from "react";
import { AppContext } from "@/app/_context/AppContext";

export const useDeleteFile = ({ objectKey }: { objectKey: string }) => {
  const { folder } = useContext(AppContext);
  const fetcher = useFetcher();
  const objects = useListObjects({ folder });

  const deleteFile = async () => {
    try {
      await fetcher("/api/s3/objects/delete", {
        method: "DELETE",
        body: JSON.stringify({
          key: objectKey,
        }),
      });

      toast.success("File deleted");
      const newObjectsData = [...(objects.data?.objects ?? [])].filter(
        (object: _Object) => {
          return object.Key !== objectKey;
        }
      );
      objects.mutate(
        { ...objects.data, objects: newObjectsData },
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
