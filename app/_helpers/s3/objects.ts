import { _Object } from "@aws-sdk/client-s3";
import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useFetcher } from "../../_hooks/fetcher/use-fetcher";

const createQueryString = (params: Record<string, string | number | boolean | undefined | null>) => {
    return Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null)
        .map((key, index) => `${index === 0 ?"?" : ""}${key}=${params[key]}`)
        .join("&");
}

export const useListObjects = ({ folder }: { folder?: string }) => {
    const pathname = usePathname();
    const [objects, setObjects] = useState<_Object[] | null>(null);
    const [folders, setFolders] = useState<{prefix: string, label: string}[] | null>(null);
    const [startAfter, setStartAfter] = useState<string | null>(null);
    const [continuationToken, setContinuationToken] = useState<string | null>(null);
    const [isTruncated, setIsTruncated] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetcher = useFetcher();

    const hasAlreadyFetched = objects || folders;

    const listObjects = useCallback(async () => {
        if (!isTruncated || (!startAfter && hasAlreadyFetched) || isLoading) return;
        setIsLoading(true);
    const response = await fetcher(`/api/s3/objects/list${createQueryString({ folder: folder ? `${folder}/` : undefined, startAfter })}`);

        setIsLoading(false);

        if (!response.ok) {
            console.error("Failed to list objects");
            return;
        }

        const data = await response.json();
        setContinuationToken(data.continuationToken);
        setStartAfter(null);
        setIsTruncated(data.isTruncated);
        setObjects([...(objects ?? []), ...data.objects]);
        setFolders([...(folders ?? []), ...data.folders]);
    }, [objects, folder, startAfter, folders, isTruncated, hasAlreadyFetched, isLoading]);

    const loadMore = () => {
        if (isTruncated) {
            setStartAfter(continuationToken);
        }
    };

    useEffect(() => {
        listObjects();
    }, [listObjects]);

    useEffect(() => {
        setObjects([]);
        setFolders([]);
        setStartAfter(null);
        setContinuationToken(null);
        setIsTruncated(false);
    }, [pathname]);

    return { objects, folders, loadMore, isTruncated, isLoading, setObjects };
};