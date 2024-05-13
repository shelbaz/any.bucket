"use client";
import { Button } from "@/app/_components/buttons/Button";
import { OptionCard } from "@/app/_components/cards/OptionCard";
import { DocumentsEmptyState } from "@/app/_components/empty-states/DocumentsEmptyState";
import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";
import { Loader } from "@/app/_components/loaders/Loader";
import { SessionContext } from "@/app/_context/SessionContext";
import { Bucket } from "@/app/_db/bucket";
import { Integration } from "@/app/_db/integration";
import { getProviderLabel } from "@/app/_helpers/buckets/provider-options";
import { useCreateBucket } from "@/app/_hooks/bucket/use-create-bucket";
import { useUpdateBucket } from "@/app/_hooks/bucket/use-update-bucket";
import { useListKeys } from "@/app/_hooks/key/use-list-keys";
import { PlusIcon } from "@heroicons/react/16/solid";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { use, useState } from "react";

const KeysPage = () => {
  const { session } = use(SessionContext);
  const {
    data: keysData,
    mutate: mutateKeys,
    isLoading,
  } = useListKeys({
    workspaceId: session.workspaceId,
  });
  const [createOrUpdateBucketModalIsOpen, setCreateOrUpdateBucketModalIsOpen] =
    useState(false);
  const [integrationId, setIntegrationId] = useState<ObjectId | null>(null);
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);

  const { createBucket } = useCreateBucket({
    workspaceId: session.workspaceId,
  });
  const { updateBucket } = useUpdateBucket({
    workspaceId: session.workspaceId,
  });

  const handleResetForm = () => {
    setSelectedIntegration(null);
    setIntegrationId(null);
  };

  const handleCloseModal = () => {
    setCreateOrUpdateBucketModalIsOpen(false);
    setTimeout(handleResetForm, 300);
  };

  const handleCreateOrUpdate = async (
    bucket: Omit<Bucket, "workspaceId" | "_id" | "updatedAt" | "createdAt">
  ) => {
    if (!bucket) return;

    let response;
    if (!integrationId) {
      response = await createBucket(bucket);
    } else {
      response = await updateBucket(integrationId, bucket);
    }

    if (response) {
      handleResetForm();
    }
  };

  return (
    <>
      <BreadcrumbsTopbar>
        <Breadcrumbs
          basePath="/settings"
          crumbs={[
            { title: "Settings", segment: "/" },
            { title: "Keys", segment: "" },
          ]}
        />
      </BreadcrumbsTopbar>
      <div className="p-4 lg:p-12 max-w-6xl mx-auto">
        <div className="flex justify-between items-end">
          <h1 className="text-2xl font-semibold text-zinc-800 -mb-1 flex items-center">
            <span>Keys</span>
            {keysData?.integrations.length ? (
              <span className="h-5 w-5 ml-2 -mb-0.5 text-xs font-extrabold bg-zinc-200 text-zinc-700 rounded-full items-center justify-center flex">
                {keysData.integrations.length}
              </span>
            ) : (
              ""
            )}
          </h1>
          <Button
            variant="primary"
            label="Add Key"
            onClick={() => {
              setCreateOrUpdateBucketModalIsOpen(true);
            }}
            Icon={<PlusIcon className="h-4 w-4" />}
          />
        </div>
        <ul className="mt-6 flex flex-col space-y-4">
          {keysData?.integrations.length === 0 && (
            <DocumentsEmptyState
              title="No Keys Yet"
              description="Click 'Add Key' in the top-right to get started."
            />
          )}
          {keysData?.integrations.map((integration) => (
            <OptionCard
              key={integration._id.toString()}
              title={integration.name}
              options={[
                {
                  label: "Edit Details",
                  action: () => {
                    setIntegrationId(integration._id);
                    setSelectedIntegration(integration);
                    setCreateOrUpdateBucketModalIsOpen(true);
                  },
                },
              ]}
              icon={
                <div className="h-16 w-16 flex items-center justify-center overflow-hidden rounded-md bg-white relative">
                  <Image
                    src={`/images/icons/providers/${integration.name}.svg`}
                    alt={integration.name}
                    height={48}
                    width={48}
                  />
                </div>
              }
            />
          ))}
          {isLoading && (
            <div className="flex items-center justify-center h-48">
              <Loader size={24} />
            </div>
          )}
        </ul>
      </div>

      {/* <CreateOrUpdateBucketModal
        isOpen={createOrUpdateBucketModalIsOpen}
        handleClose={handleCloseModal}
        handleSave={handleCreateOrUpdate}
        provider={selectedBucket?.provider}
        accessKeyId={selectedBucket?.accessKeyId}
        secretAccessKey={selectedBucket?.secretAccessKey}
        endpoint={selectedBucket?.endpoint}
        name={selectedBucket?.name}
        displayName={selectedBucket?.displayName}
        region={selectedBucket?.region}
        publicDomain={selectedBucket?.publicDomain}
        integrationId={selectedBucket?._id}
      /> */}
    </>
  );
};

export default KeysPage;
