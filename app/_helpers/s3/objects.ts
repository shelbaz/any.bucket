import { _Object } from "@aws-sdk/client-s3";
import { useCallback, useEffect, useState } from "react";

export const useListObjects = ({ folder }: { folder?: string }) => {
    const [objects, setObjects] = useState<_Object[] | null>(null);
    const [folders, setFolders] = useState<{prefix: string, label: string}[] | null>(null);

    const listObjects = useCallback(async () => {
        if (objects) return;
        const response = await fetch(`/api/s3/objects/list${folder ? `?folder=${folder}/` : ""}`);

        if (!response.ok) {
            console.error("Failed to list objects");
            return;
        }

        const data = await response.json();
        setObjects(data.objects);
        setFolders(data.folders);
    }, [objects, folder]);


    useEffect(() => {
        listObjects();
    }, [listObjects]);

    return { objects, folders };
};