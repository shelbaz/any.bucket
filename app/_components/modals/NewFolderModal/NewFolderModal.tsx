import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Input } from "../../form/Input";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: (name: string) => void;
}

export const NewFolderModal = ({ isOpen, handleClose, handleSave }: Props) => {
  const [name, setName] = useState("");

  const saveName = (name: string) => {
    if (!isOpen) return;
    handleSave(name);
    handleClose();
  };

  useHotkeys("enter", () => saveName(name), { enableOnFormTags: true }, [name]);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title="Create New Folder"
      body={
        <div className="pb-2">
          <label
            htmlFor="new-folder"
            className="block text-sm font-semibold text-zinc-800 mb-1"
          >
            Folder Name
          </label>
          <Input
            id="new-folder"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Folder"
            autoFocus
          />
        </div>
      }
      confirmButton={{
        label: "Save",
        onClick: () => saveName(name),
      }}
      cancelButton={{
        label: "Cancel",
        onClick: handleClose,
      }}
    />
  );
};
