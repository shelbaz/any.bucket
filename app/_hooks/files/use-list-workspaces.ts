import useSWR from "swr";
import { useFetcher } from "../fetcher/use-fetcher";
import { Workspace } from "@/app/_db/workspace";

export const useListWorkspaces = () => {
  const fetcher = useFetcher();
  const response = useSWR<{ workspaces: Workspace[] }>(
    "/api/workspace/list",
    fetcher
  );
  return response;
};
