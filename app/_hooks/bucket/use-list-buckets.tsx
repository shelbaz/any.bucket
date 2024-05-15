import useSWR from "swr";
import { useFetcher } from "../fetcher/use-fetcher";
import { Bucket } from "@/app/_db/bucket";

export const useListBuckets = ({ workspaceId }: { workspaceId: string }) => {
  const fetcher = useFetcher();
  const response = useSWR<{ buckets: Bucket[] }>(
    `/api/workspace/${workspaceId}/bucket/list`,
    fetcher
  );
  return response;
};
