import { useContext } from "react";
import { useFetcher } from "../fetcher/use-fetcher";
import useSWR from "swr";
import { AppContext } from "@/app/_context/AppContext";
import { SessionContext } from "@/app/_context/SessionContext";

const createQueryString = (
  params: Record<string, string | number | boolean | undefined | null>
) => {
  return Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key, index) => `${index === 0 ? "?" : ""}${key}=${params[key]}`)
    .join("&");
};

export const useListFiles = ({
  folder,
  search = "",
  orderBy = "Key",
  orderDir = "asc",
}: {
  folder?: string;
  search?: string;
  orderBy?: string;
  orderDir?: "asc" | "desc";
}) => {
  const { page, pageSize } = useContext(AppContext);
  const { session } = useContext(SessionContext);
  const bucketId = session.bucketId;
  const fetcher = useFetcher();
  const response = useSWR(
    bucketId
      ? `/api/s3/objects/list${createQueryString({
          folder: folder ? `${folder}/` : undefined,
          page,
          pageSize,
          bucketId,
          search,
          orderBy,
          orderDir,
        })}`
      : undefined,
    fetcher
  );

  return response;
};
