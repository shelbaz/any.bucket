import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

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

  useHotkeys("enter", () => handleSave(name), { enableOnFormTags: true });

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
          <input
            id="rename-file"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your_file.zip"
            autoFocus
            className="py-2 px-3 border border-zinc-900 rounded w-full focus:outline-none focus:shadow"
          />
        </div>
      }
      confirmButton={{
        label: "Save",
        onClick: () => {
          handleSave(name);
          handleClose();
        },
      }}
      cancelButton={{
        label: "Cancel",
        onClick: handleClose,
      }}
    />
  );
};