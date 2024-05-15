import { useFetcher } from "../fetcher/use-fetcher";
import { Workspace } from "@/app/_db/workspace";

export const useUpdateWorkspace = () => {
  const fetcher = useFetcher();

  const updateWorkspace = async (
    workspaceId: string,
    workspaceDetails: Partial<Workspace>
  ) => {
    const response = await fetcher(`/api/workspace/${workspaceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...workspaceDetails },
    });
    return response;
  };

  return {
    updateWorkspace,
  };
};
