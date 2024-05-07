import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  currentObjectKey: string | null;
  handleSave: (curentObjectKey: string, folderName: string) => void;
}

export const MoveModal = ({
  isOpen,
  handleClose,
  handleSave,
  currentObjectKey,
}: Props) => {
  const [folderName, setFolderName] = useState("");
  const [objectKey, setObjectKey] = useState(currentObjectKey ?? "");

  useEffect(() => {
    setObjectKey(currentObjectKey ?? "");
    setFolderName(currentObjectKey?.split("/").slice(0, -1).join("/") ?? "");
  }, [currentObjectKey]);

  const moveFile = (folderName: string) => {
    handleSave(objectKey, folderName);
    handleClose();
  };

  useHotkeys("enter", () => moveFile(folderName), { enableOnFormTags: true }, [
    name,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title="Move to Folder"
      body={<div className="pb-2"></div>}
      confirmButton={{
        label: "Move",
        onClick: () => moveFile(folderName),
      }}
      cancelButton={{
        label: "Cancel",
        onClick: handleClose,
      }}
    />
  );
};
