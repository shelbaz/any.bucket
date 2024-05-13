import useSWR from "swr";
import { useFetcher } from "../fetcher/use-fetcher";
import { Bucket } from "@/app/_db/bucket";

export const useListKeys = ({ workspaceId }: { workspaceId: string }) => {
  const fetcher = useFetcher();
  const response = useSWR<{ buckets: Bucket[] }>(
    `/api/workspace/${workspaceId}/integration/list`,
    fetcher
  );
  return response;
};
