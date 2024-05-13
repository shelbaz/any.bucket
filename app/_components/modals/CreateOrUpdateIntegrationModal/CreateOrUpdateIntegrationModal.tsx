import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import { Input } from "../../form/Input";
import { Integration } from "@/app/_db/integration";
import { integrationOptions } from "@/app/_helpers/integrations/integration-options";
import { Select } from "../../form/Select";
import { ObjectId } from "mongodb";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: (
    integration: Omit<
      Integration,
      "_id" | "updatedAt" | "createdAt" | "workspaceId"
    >
  ) => Promise<void>;
  name?: string;
  integrationKey?: string;
  integrationId?: ObjectId;
}

export const CreateOrUpdateIntegrationModal = ({
  isOpen,
  handleClose,
  handleSave,
  name,
  integrationKey,
  integrationId,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    setNewName(name ?? "");
    setNewKey(integrationKey ?? "");
  }, [integrationKey, name]);

  const saveKey = async () => {
    if (!isOpen) return;

    setIsLoading(true);

    await handleSave({
      key: newKey ?? "",
      name: newName ?? "openai",
    });
    setIsLoading(false);
    handleClose();
  };

  return (
    <Modal
      modalClass="!max-w-lg w-full"
      isOpen={isOpen}
      handleClose={handleClose}
      title={integrationId ? "Update Integration" : "Create Integration"}
      body={
        <div className="pb-2 space-y-4">
          <Select
            label="Service"
            options={integrationOptions}
            value={
              integrationOptions.find((i) => i.value === name) ??
              integrationOptions[0]
            }
            onChange={(option) => setNewName(option.value)}
            disabled={!!integrationId}
          />
          <div>
            <label
              htmlFor="key-id"
              className="block text-sm font-semibold text-zinc-800 mb-1"
            >
              Key
            </label>
            <Input
              id="key-id"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="sk-proj-SJzO5zLkOchcDvFHIf3qL3BlbkFJZSDqyW8cacFfdIBca"
            />
          </div>
        </div>
      }
      confirmButton={{
        label: "Save Integration",
        onClick: saveKey,
        loading: isLoading,
      }}
      cancelButton={{
        label: "Cancel",
        onClick: handleClose,
      }}
    />
  );
};
