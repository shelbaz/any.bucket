"use client";
import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";
import { SessionContext } from "@/app/_context/SessionContext";
import { useListBuckets } from "@/app/_hooks/files/use-list-buckets";
import { use } from "react";

const BucketsPage = () => {
  const session = use(SessionContext);
  const { data: bucketsData } = useListBuckets({
    workspaceId: session.workspaceId,
  });
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
      <div className="grid grid-cols-12 gap-4 p-4 lg:p-12">
        <h1>Buckets</h1>
        <ul>
          {bucketsData?.buckets.map((bucket) => (
            <li key={bucket._id.toString()}>{bucket.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BucketsPage;
