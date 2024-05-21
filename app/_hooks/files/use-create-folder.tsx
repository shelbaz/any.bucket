import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useFetcher } from "../fetcher/use-fetcher";
import { useListFiles } from "@/app/_hooks/files/use-list-files";
import { useContext } from "react";
import { AppContext } from "@/app/_context/AppContext";

export const useCreateFolder = () => {
  const fetcher = useFetcher();
  const { folder } = useContext(AppContext);
  const files = useListFiles({ folder });

  const createFolder = async (newName: string) => {
    const newFoldersData = [
      ...(files.data?.folders ?? []),
      { name: newName, prefix: `${folder ? `${folder}/` : ""}${newName}` },
    ];

    const toastId = toast.loading("Creating folder...");
    try {
      await fetcher("/api/s3/objects/folder", {
        method: "POST",
        data: {
          key: `${folder ? `${folder}/` : ""}${newName}`,
        },
      });

      await files.mutate(
        { ...files.data, folders: newFoldersData },
        { revalidate: false }
      );
      toast.success("Folder created successfully", { id: toastId });
    } catch (e) {
      console.log("ERROR:", e);
      toast.error("Failed to create folder", { id: toastId });
    }
  };

  return {
    createFolder,
  };
};
