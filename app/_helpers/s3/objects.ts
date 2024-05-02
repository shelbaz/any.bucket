import { useFetcher } from "../../_hooks/fetcher/use-fetcher";
import useSWR from "swr";

const createQueryString = (params: Record<string, string | number | boolean | undefined | null>) => {
    return Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null)
        .map((key, index) => `${index === 0 ?"?" : ""}${key}=${params[key]}`)
        .join("&");
};

export const useListObjects = ({ folder, continuationToken }: { folder?: string; continuationToken?: string }) => {
    const fetcher = useFetcher();
    const response = useSWR(`/api/s3/objects/list${createQueryString({ folder: folder ? `${folder}/` : undefined, startAfter: continuationToken })}`, fetcher);

    return response;
};