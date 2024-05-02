import { useFetcher } from "../fetcher/use-fetcher";
import useSWR from "swr";

const createQueryString = (params: Record<string, string | number | boolean | undefined | null>) => {
    return Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null)
        .map((key, index) => `${index === 0 ?"?" : ""}${key}=${params[key]}`)
        .join("&");
};

export const useListFiles = ({ folder, page, pageSize }: { folder?: string; page?: number, pageSize?: number }) => {
    const fetcher = useFetcher();
    const response = useSWR(`/api/s3/objects/list${createQueryString({ folder: folder ? `${folder}/` : undefined, page, pageSize })}`, fetcher);

    return response;
};