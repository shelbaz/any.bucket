"use client";
import { Button } from "@/app/_components/buttons/Button";
import { OptionCard } from "@/app/_components/cards/OptionCard";
import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";
import { Loader } from "@/app/_components/loaders/Loader";
import { CreateOrUpdateBucketModal } from "@/app/_components/modals/CreateOrUpdateBucketModal";
import { SessionContext } from "@/app/_context/SessionContext";
import { Bucket } from "@/app/_db/bucket";
import { getBucketIcon } from "@/app/_helpers/buckets/get-bucket-icon";
import { getProviderLabel } from "@/app/_helpers/buckets/provider-options";
import { useCreateBucket } from "@/app/_hooks/bucket/use-create-bucket";
import { useListBuckets } from "@/app/_hooks/bucket/use-list-buckets";
import { useUpdateBucket } from "@/app/_hooks/bucket/use-update-bucket";
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
    }
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
            ) : (
              ""
            )}
          </h1>
          <Button
            variant="primary"
            label="Add Bucket"
            onClick={() => {
              setCreateOrUpdateBucketModalIsOpen(true);
            }}
            Icon={<PlusIcon className="h-4 w-4" />}
          />
        </div>
        <ul className="mt-6">
          {bucketsData?.buckets.map((bucket) => (
            <OptionCard
              key={bucket._id.toString()}
              title={bucket.displayName || bucket.name}
              description={getProviderLabel(bucket.provider)}
              options={[
                {
                  label: "Select Bucket",
                  action: async () => {
                    const toastId = toast.loading("Selecting bucket...");
                    await updateSession({
                      ...session,
                      bucketId: bucket._id.toString(),
                    });
                    toast.success("Bucket selected", { id: toastId });
                  },
                },
                {
                  label: "Edit Details",
                  action: () => {
                    setBucketId(bucket._id);
                    setSelectedBucket(bucket);
                    setCreateOrUpdateBucketModalIsOpen(true);
                  },
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
                session.bucketId === bucket._id.toString() ? "border-black" : ""
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
