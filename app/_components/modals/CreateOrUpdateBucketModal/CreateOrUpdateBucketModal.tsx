import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Input } from "../../form/Input";
import { Bucket } from "@/app/_db/bucket";
import { Select } from "../../form/Select";
import { set } from "lodash";

const providerOptions = [
  { value: "s3", label: "AWS S3" },
  { value: "cloudflare", label: "Cloudflare R2" },
  { value: "wasabi", label: "Wasabi" },
  { value: "minio", label: "Minio" },
  { value: "backblaze", label: "Backblaze B2" },
  { value: "other", label: "Other" },
];

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: (
    bucket: Omit<Bucket, "_id" | "updatedAt" | "createdAt" | "workspaceId">
  ) => Promise<void>;
  provider?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  endpoint?: string;
  name?: string;
  displayName?: string;
  region?: string;
  publicDomain?: string;
  bucketId?: string;
}

export const CreateOrUpdateBucketModal = ({
  isOpen,
  handleClose,
  handleSave,
  provider,
  accessKeyId,
  secretAccessKey,
  endpoint,
  name,
  displayName,
  region,
  publicDomain,
  bucketId,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newProvider, setNewProvider] = useState(provider);
  const [newAccessKeyId, setNewAccessKeyId] = useState(accessKeyId ?? "");
  const [newSecretAccessKey, setNewSecretAccessKey] = useState(
    secretAccessKey ?? ""
  );
  const [newEndpoint, setNewEndpoint] = useState(endpoint ?? "");
  const [newName, setNewName] = useState(name ?? "");
  const [newDisplayName, setNewDisplayName] = useState(displayName ?? "");
  const [newRegion, setNewRegion] = useState(region ?? "");
  const [newPublicDomain, setNewPublicDomain] = useState(publicDomain ?? "");

  useEffect(() => {
    setNewAccessKeyId(accessKeyId ?? "");
    setNewSecretAccessKey(secretAccessKey ?? "");
    setNewEndpoint(endpoint ?? "");
    setNewName(name ?? "");
    setNewDisplayName(displayName ?? "");
    setNewRegion(region ?? "");
    setNewPublicDomain(publicDomain ?? "");
  }, [
    accessKeyId,
    secretAccessKey,
    endpoint,
    name,
    displayName,
    region,
    publicDomain,
  ]);

  const saveBucket = async () => {
    if (!isOpen) return;

    setIsLoading(true);

    await handleSave({
      accessKeyId: newAccessKeyId,
      secretAccessKey: newSecretAccessKey,
      endpoint: newEndpoint,
      name: newName,
      displayName: newDisplayName,
      region: newRegion,
      publicDomain: newPublicDomain,
    });
    setIsLoading(false);
    handleClose();
  };

  const closeModal = () => {
    setIsLoading(false);
    setNewProvider("");
    setNewAccessKeyId("");
    setNewSecretAccessKey("");
    setNewEndpoint("");
    setNewName("");
    setNewDisplayName("");
    setNewRegion("");
    setNewPublicDomain("");
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title={bucketId ? "Update Bucket" : "Create Bucket"}
      body={
        <div className="pb-2">
          <Select
            label="Provider"
            value={
              providerOptions.find((o) => o.value === newProvider) ??
              providerOptions[0]
            }
            options={providerOptions.sort((a, b) =>
              a.label.localeCompare(b.label)
            )}
            onChange={(option) => setNewProvider(option.value)}
          />
          {/* <label
            htmlFor="rename-file"
            className="block text-sm font-semibold text-zinc-800 mb-1"
          >
            File name
          </label> */}
        </div>
      }
      confirmButton={{
        label: "Save Bucket",
        onClick: () => saveBucket(),
        loading: isLoading,
      }}
      cancelButton={{
        label: "Cancel",
        onClick: handleClose,
      }}
    />
  );
};
