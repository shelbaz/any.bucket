import useSWR from "swr";
import { useFetcher } from "../fetcher/use-fetcher";

export const useListWorkspaces = ({ workspaceId }: { workspaceId: string }) => {
  const fetcher = useFetcher();
  const response = useSWR(`/api/workspaces/${workspaceId}/buckets`, fetcher);
  return response;
};
