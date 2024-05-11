"use client";
import { Button } from "@/app/_components/buttons/Button";
import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";
import { CreateOrUpdateBucketModal } from "@/app/_components/modals/CreateOrUpdateBucketModal";
import { SessionContext } from "@/app/_context/SessionContext";
import { useListBuckets } from "@/app/_hooks/bucket/use-list-buckets";
import { PlusIcon } from "@heroicons/react/16/solid";
import { use, useState } from "react";

const BucketsPage = () => {
  const session = use(SessionContext);
  const { data: bucketsData, mutate: mutateBuckets } = useListBuckets({
    workspaceId: session.workspaceId,
  });
  const [createOrUpdateBucketModalIsOpen, setCreateOrUpdateBucketModalIsOpen] =
    useState(false);
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
      <div className="p-4 lg:p-12">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-zinc-800">Buckets</h1>
          <Button
            variant="primary"
            label="Add Bucket"
            onClick={() => {
              setCreateOrUpdateBucketModalIsOpen(true);
            }}
            Icon={<PlusIcon className="h-4 w-4" />}
          />
        </div>
        <ul>
          {bucketsData?.buckets.map((bucket) => (
            <li key={bucket._id.toString()}>{bucket.name}</li>
          ))}
        </ul>
      </div>

      <CreateOrUpdateBucketModal
        isOpen={createOrUpdateBucketModalIsOpen}
        handleClose={() => setCreateOrUpdateBucketModalIsOpen(false)}
        handleSave={async (bucket) => {
          console.log("SAVE BUCKET", bucket);
          mutateBuckets();
        }}
      />
    </>
  );
};

export default BucketsPage;
