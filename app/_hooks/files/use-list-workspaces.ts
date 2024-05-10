import useSWR from "swr";
import { useFetcher } from "../fetcher/use-fetcher";

export const useListWorkspaces = () => {
  const fetcher = useFetcher();
  const response = useSWR("/api/workspaces", fetcher);
  return response;
};
