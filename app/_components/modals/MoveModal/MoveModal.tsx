import { Modal } from "../Modal";
import { useEffect, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { FolderRow } from "../../files/FolderRow";
import { useListFiles } from "@/app/_hooks/files/use-list-files";
import { Folder } from "@/app/_types";
import { Loader } from "../../loaders/Loader";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  currentObjectKey: string | null;
  handleSave: (folderName: string) => void;
}

export const MoveModal = ({
  isOpen,
  handleClose,
  handleSave,
  currentObjectKey,
}: Props) => {
  const [folderName, setFolderName] = useState("");
  const files = useListFiles({ folder: folderName });

  const currentFolderName = useMemo(() => {
    return currentObjectKey?.split("/").slice(0, -1).join("/") ?? "";
  }, [currentObjectKey]);

  useEffect(() => {
    setFolderName(currentFolderName);
  }, [currentFolderName]);

  const moveFile = (folderName: string) => {
    if (!isOpen) return;
    handleSave(folderName);
    handleClose();
  };

  useHotkeys("enter", () => moveFile(folderName), { enableOnFormTags: true }, [
    folderName,
  ]);

  const prettyName = useMemo(() => {
    if (folderName) {
      return `/${folderName}`;
    }
    return "/";
  }, [folderName]);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title={`Move to ${prettyName}`}
      body={
        <div className="pb-2">
          <ul className="flex flex-col rounded-lg border border-zinc-200 divide-y divide-zinc-200 h-[370px] overflow-y-auto">
            {files.isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader size={24} />
              </div>
            ) : (
              <>
                {folderName && (
                  <FolderRow
                    label=".."
                    onClick={() =>
                      setFolderName(
                        folderName.split("/").slice(0, -1).join("/")
                      )
                    }
                  />
                )}
                {files.data?.folders?.map((folder: Folder) => (
                  <FolderRow
                    key={folder.prefix}
                    label={folder.label}
                    onClick={() => setFolderName(folder.prefix)}
                  />
                ))}
              </>
            )}
          </ul>
        </div>
      }
      confirmButton={{
        label: "Move",
        onClick: () => moveFile(folderName),
        disabled: folderName === currentFolderName,
      }}
      cancelButton={{
        label: "Cancel",
        onClick: handleClose,
      }}
    />
  );
};
