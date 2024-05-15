import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Input } from "../../form/Input";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  currentName: string | null;
  handleSave: (name: string) => void;
}

export const RenameModal = ({
  isOpen,
  handleClose,
  handleSave,
  currentName,
}: Props) => {
  const [name, setName] = useState(currentName ?? "");

  useEffect(() => {
    setName(currentName ?? "");
  }, [currentName]);

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
      title="Rename File"
      body={
        <div className="pb-2">
          <label
            htmlFor="rename-file"
            className="block text-sm font-semibold text-zinc-800 mb-1"
          >
            File name
          </label>
          <Input
            id="rename-file"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your_file.zip"
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
