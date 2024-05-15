import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import { Input } from "../../form/Input";
import { Bucket } from "@/app/_db/bucket";
import { Select } from "../../form/Select";
import { ObjectId } from "mongodb";
import { providerOptions } from "@/app/_helpers/buckets/provider-options";

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
  bucketId?: ObjectId;
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
  const [newProvider, setNewProvider] = useState("");
  const [newAccessKeyId, setNewAccessKeyId] = useState("");
  const [newSecretAccessKey, setNewSecretAccessKey] = useState("");
  const [newEndpoint, setNewEndpoint] = useState("");
  const [newName, setNewName] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newRegion, setNewRegion] = useState("");
  const [newPublicDomain, setNewPublicDomain] = useState("");

  useEffect(() => {
    setNewProvider(provider ?? providerOptions[0].value);
    setNewAccessKeyId(accessKeyId ?? "");
    setNewSecretAccessKey(secretAccessKey ?? "");
    setNewEndpoint(endpoint ?? "");
    setNewName(name ?? "");
    setNewDisplayName(displayName ?? "");
    setNewRegion(region ?? "");
    setNewPublicDomain(publicDomain ?? "");
  }, [
    provider,
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
      provider: newProvider ?? providerOptions[0].value,
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

  return (
    <Modal
      modalClass="!max-w-lg w-full"
      isOpen={isOpen}
      handleClose={handleClose}
      title={bucketId ? "Update Bucket" : "Create Bucket"}
      body={
        <div className="pb-2 space-y-4">
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
          <div>
            <label
              htmlFor="access-key-id"
              className="block text-sm font-semibold text-zinc-800 mb-1"
            >
              Access Key ID
            </label>
            <Input
              id="access-key-id"
              value={newAccessKeyId}
              onChange={(e) => setNewAccessKeyId(e.target.value)}
              placeholder="AKIAQKKPGPXGXG3WEHF3"
            />
          </div>
          <div>
            <label
              htmlFor="secret-access-key"
              className="block text-sm font-semibold text-zinc-800 mb-1"
            >
              Secret Access Key
            </label>
            <Input
              id="secret-access-key"
              value={newSecretAccessKey}
              onChange={(e) => setNewSecretAccessKey(e.target.value)}
              placeholder="2T6RIC5w2X0hqX93loiMBiJGRN5gEXAMPLEKEY"
            />
          </div>
          <div>
            <label
              htmlFor="endpoint"
              className="block text-sm font-semibold text-zinc-800 mb-1"
            >
              Endpoint
            </label>
            <Input
              id="endpoint"
              value={newEndpoint}
              onChange={(e) => setNewEndpoint(e.target.value)}
              placeholder="https://s3.amazonaws.com"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-zinc-800 mb-1"
            >
              Bucket Name
            </label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="my-bucket"
            />
          </div>
          <div>
            <label
              htmlFor="display-name"
              className="block text-sm font-semibold text-zinc-800 mb-1"
            >
              Display Name
            </label>
            <Input
              id="display-name"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              placeholder="My Bucket"
            />
          </div>
          <div>
            <label
              htmlFor="region"
              className="block text-sm font-semibold text-zinc-800 mb-1"
            >
              Region
            </label>
            <Input
              id="region"
              value={newRegion}
              onChange={(e) => setNewRegion(e.target.value)}
              placeholder="us-east-1"
            />
          </div>
          {newProvider === "cloudflare" && (
            <div>
              <label
                htmlFor="public-domain"
                className="block text-sm font-semibold text-zinc-800 mb-1"
              >
                Public Domain
              </label>
              <Input
                id="public-domain"
                value={newPublicDomain}
                onChange={(e) => setNewPublicDomain(e.target.value)}
                placeholder="https://files.customdomain.com"
              />
            </div>
          )}
        </div>
      }
      confirmButton={{
        label: "Save Bucket",
        onClick: saveBucket,
        loading: isLoading,
      }}
      cancelButton={{
        label: "Cancel",
        onClick: handleClose,
      }}
    />
  );
};
