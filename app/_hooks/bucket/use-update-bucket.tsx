import { Bucket } from "@/app/_db/bucket";
import { useFetcher } from "../fetcher/use-fetcher";
import { ObjectId } from "mongodb";

export const useUpdateBucket = ({ workspaceId }: { workspaceId: string }) => {
  const fetcher = useFetcher();

  const updateBucket = async (
    bucketId: ObjectId,
    bucketDetails: Omit<
      Bucket,
      "_id" | "workspaceId" | "updatedAt" | "createdAt"
    >
  ) => {
    const response = await fetcher(
      `/api/workspace/${workspaceId}/bucket/${bucketId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: { ...bucketDetails },
      }
    );
    return response;
  };

  return {
    updateBucket,
  };
};
