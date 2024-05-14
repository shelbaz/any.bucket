import { Bucket } from "@/app/_db/bucket";
import { useFetcher } from "../fetcher/use-fetcher";

export const useCreateBucket = ({ workspaceId }: { workspaceId: string }) => {
  const fetcher = useFetcher();

  const createBucket = async (
    bucketDetails: Omit<
      Bucket,
      "_id" | "updatedAt" | "createdAt" | "workspaceId"
    >
  ) => {
    const response = await fetcher(`/api/workspace/${workspaceId}/bucket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...bucketDetails },
    });
    return response;
  };

  return {
    createBucket,
  };
};
