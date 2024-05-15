"use client";
import { PayButton } from "@/app/_components/PayButton";
import { Button } from "@/app/_components/buttons/Button";
import { OptionCard } from "@/app/_components/cards/OptionCard";
import { DocumentsEmptyState } from "@/app/_components/empty-states/DocumentsEmptyState";
import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";
import { Loader } from "@/app/_components/loaders/Loader";
import { CreateOrUpdateBucketModal } from "@/app/_components/modals/CreateOrUpdateBucketModal";
import { SessionContext } from "@/app/_context/SessionContext";
import { Bucket } from "@/app/_db/bucket";
import { getProviderLabel } from "@/app/_helpers/buckets/provider-options";
import { useCreateBucket } from "@/app/_hooks/bucket/use-create-bucket";
import { useDeleteBucket } from "@/app/_hooks/bucket/use-delete-bucket";
import { useListBuckets } from "@/app/_hooks/bucket/use-list-buckets";
import { useUpdateBucket } from "@/app/_hooks/bucket/use-update-bucket";
import { useUpdateWorkspace } from "@/app/_hooks/workspace/use-update-workspace";
import { PlusIcon } from "@heroicons/react/16/solid";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { use, useState } from "react";
import toast from "react-hot-toast";

const BucketsPage = () => {
  const { session, updateSession } = use(SessionContext);
  const {
    data: bucketsData,
    mutate: mutateBuckets,
    isLoading,
  } = useListBuckets({
    workspaceId: session.workspaceId,
  });
  const [createOrUpdateBucketModalIsOpen, setCreateOrUpdateBucketModalIsOpen] =
    useState(false);
  const [bucketId, setBucketId] = useState<ObjectId | null>(null);
  const [selectedBucket, setSelectedBucket] = useState<Bucket | null>(null);

  const { createBucket } = useCreateBucket({
    workspaceId: session.workspaceId,
  });
  const { updateBucket } = useUpdateBucket({
    workspaceId: session.workspaceId,
  });
  const { deleteBucket } = useDeleteBucket({
    workspaceId: session.workspaceId,
  });
  const { updateWorkspace } = useUpdateWorkspace();

  const handleResetForm = () => {
    setSelectedBucket(null);
    setBucketId(null);
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
    if (!bucketId) {
      response = await createBucket(bucket);
    } else {
      response = await updateBucket(bucketId, bucket);
    }

    if (response) {
      handleResetForm();
      mutateBuckets();
      updateSession({
        bucketId: response.bucket._id.toString(),
        publicDomain:
          response.bucket.publicDomain ||
          `${response.bucket.endpoint}/${response.bucket.name}`,
      });
    }
  };

  const handleSelectBucket = async (bucket: Bucket) => {
    const toastId = toast.loading("Selecting bucket...");
    await updateSession({
      bucketId: bucket._id.toString(),
      publicDomain: bucket.publicDomain || `${bucket.endpoint}/${bucket.name}`,
    });
    await updateWorkspace(session.workspaceId, {
      defaultBucketId: bucket._id,
    });
    toast.success("Bucket selected", { id: toastId });
  };

  return (
    <>
      <BreadcrumbsTopbar>
        <Breadcrumbs
          basePath="/settings"
          crumbs={[
            { title: "Settings", segment: "/" },
            { title: "Buckets", segment: "" },
          ]}
        />
      </BreadcrumbsTopbar>
      <div className="p-4 lg:p-12 max-w-6xl mx-auto">
        <div className="flex justify-between items-end">
          <h1 className="text-2xl font-semibold text-zinc-800 -mb-1 flex items-center">
            <span>Buckets</span>
            {bucketsData?.buckets.length ? (
              <span className="h-5 w-5 ml-2 -mb-0.5 text-xs font-extrabold bg-zinc-200 text-zinc-700 rounded-full items-center justify-center flex">
                {bucketsData.buckets.length}
              </span>
            ) : null}
          </h1>
          {session.plan && session.plan !== "free" ? (
            <Button
              variant="primary"
              label="Add Bucket"
              onClick={() => {
                setCreateOrUpdateBucketModalIsOpen(true);
              }}
              Icon={<PlusIcon className="h-4 w-4" />}
            />
          ) : (
            <PayButton label="Purchase to Add Bucket - $19 (one time)" />
          )}
        </div>
        <ul className="mt-6 flex flex-col space-y-4">
          {bucketsData?.buckets.length === 0 && (
            <DocumentsEmptyState
              title="No Buckets Yet"
              description="Click 'Add Bucket' in the top-right to get started."
            />
          )}
          {bucketsData?.buckets.map((bucket) => (
            <OptionCard
              key={bucket._id.toString()}
              title={bucket.displayName || bucket.name}
              description={getProviderLabel(bucket.provider)}
              options={[
                {
                  label: "Select Bucket",
                  action: () => handleSelectBucket(bucket),
                },
                {
                  label: "Edit Details",
                  action: () => {
                    setBucketId(bucket._id);
                    setSelectedBucket(bucket);
                    setCreateOrUpdateBucketModalIsOpen(true);
                  },
                },
                {
                  label: "Delete Bucket",
                  action: async () => {
                    const toastId = toast.loading("Deleting bucket...");
                    await deleteBucket(bucket._id);
                    mutateBuckets();
                    toast.success("Bucket deleted", { id: toastId });
                  },
                  disabled: bucket._id.toString() === session.bucketId,
                  className:
                    bucket._id.toString() === session.bucketId
                      ? "opacity-50"
                      : "",
                },
              ]}
              icon={
                <div className="h-16 w-16 flex items-center justify-center overflow-hidden rounded-md bg-white relative">
                  <Image
                    src={`/images/icons/providers/${bucket.provider}.svg`}
                    alt={bucket.provider}
                    height={48}
                    width={48}
                  />
                </div>
              }
              className={
                session.bucketId === bucket._id.toString()
                  ? "!border-green-600"
                  : ""
              }
              selected={session.bucketId === bucket._id.toString()}
              onClick={() => handleSelectBucket(bucket)}
            />
          ))}
          {isLoading && (
            <div className="flex items-center justify-center h-48">
              <Loader size={24} />
            </div>
          )}
        </ul>
      </div>

      <CreateOrUpdateBucketModal
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
        bucketId={selectedBucket?._id}
      />
    </>
  );
};

export default BucketsPage;
