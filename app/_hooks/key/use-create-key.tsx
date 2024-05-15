import { useFetcher } from "../fetcher/use-fetcher";
import { Integration } from "@/app/_db/integration";

export const useCreateKey = ({ workspaceId }: { workspaceId: string }) => {
  const fetcher = useFetcher();

  const createKey = async (
    bucketDetails: Omit<
      Integration,
      "_id" | "updatedAt" | "createdAt" | "workspaceId"
    >
  ) => {
    const response = await fetcher(
      `/api/workspace/${workspaceId}/integration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { ...bucketDetails },
      }
    );
    return response;
  };

  return {
    createKey,
  };
};
