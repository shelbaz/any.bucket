import { useFetcher } from "../fetcher/use-fetcher";
import { ObjectId } from "mongodb";

export const useDeleteBucket = ({ workspaceId }: { workspaceId: string }) => {
  const fetcher = useFetcher();

  const deleteBucket = async (bucketId: ObjectId) => {
    const response = await fetcher(
      `/api/workspace/${workspaceId}/bucket/${bucketId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  };

  return {
    deleteBucket,
  };
};
