import { useLocalStorage } from "react-use";

export const useFetcher = () => {
    const [bearerToken] = useLocalStorage("fr-bearer-token");

    const fetcher = async (url: string, options: RequestInit = {}) => {
        const res = await fetch(url, {
            ...options,
            headers: {
            ...options.headers,
            Authorization: bearerToken ? `Bearer ${bearerToken}` : "",
            "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            return null;
        }
        
        return await res.json();
    };
    
    return fetcher;
}