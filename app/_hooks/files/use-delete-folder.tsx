import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";
import { useListFiles } from "@/app/_hooks/files/use-list-files";
import { useContext } from "react";
import { AppContext } from "@/app/_context/AppContext";
import { Folder } from "@/app/_types";

export const useDeleteFolder = ({ folderPrefix }: { folderPrefix: string }) => {
  const { folder } = useContext(AppContext);
  const fetcher = useFetcher();
  const files = useListFiles({ folder });

  const deleteFolder = async () => {
    const toastId = toast.loading("Deleting folder...");
    try {
      await fetcher("/api/s3/objects/folder", {
        method: "DELETE",
        data: {
          prefix: folderPrefix,
        },
      });

      toast.success("Folder deleted", { id: toastId });
      const newFoldersData = [...(files.data?.folders ?? [])].filter(
        (folder: Folder) => {
          return folder.prefix !== folderPrefix;
        }
      );
      files.mutate(
        { ...files.data, folders: newFoldersData },
        { revalidate: false }
      );
      return;
    } catch (error) {
      toast.error("Failed to delete folder", { id: toastId });
    }
  };

  return {
    deleteFolder,
  };
};
