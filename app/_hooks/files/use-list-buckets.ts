import useSWR from "swr";
import { useFetcher } from "../fetcher/use-fetcher";

export const useListBuckets = ({ workspaceId }: { workspaceId: string }) => {
  const fetcher = useFetcher();
  const response = useSWR(`/api/workspaces/${workspaceId}/buckets`, fetcher);
  return response;
};
