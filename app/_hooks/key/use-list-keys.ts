import useSWR from "swr";
import { useFetcher } from "../fetcher/use-fetcher";
import { Bucket } from "@/app/_db/bucket";
import { Integration } from "@/app/_db/integration";

export const useListKeys = ({ workspaceId }: { workspaceId: string }) => {
  const fetcher = useFetcher();
  const response = useSWR<{ integrations: Integration[] }>(
    `/api/workspace/${workspaceId}/integration/list`,
    fetcher
  );
  return response;
};
