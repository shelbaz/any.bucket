import { Bucket } from "@/app/_db/bucket";
import { useFetcher } from "../fetcher/use-fetcher";
import { ObjectId } from "mongodb";
import { Integration } from "@/app/_db/integration";

export const useUpdateKey = ({ workspaceId }: { workspaceId: string }) => {
  const fetcher = useFetcher();

  const updateKey = async (
    bucketId: ObjectId,
    bucketDetails: Omit<
      Integration,
      "_id" | "workspaceId" | "updatedAt" | "createdAt"
    >
  ) => {
    const response = await fetcher(
      `/api/workspace/${workspaceId}/integration/${bucketId}`,
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
    updateKey,
  };
};
