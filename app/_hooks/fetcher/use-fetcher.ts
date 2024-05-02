import { useLocalStorage } from "react-use";
import axios from "axios";

export const useFetcher = () => {
    const [bearerToken] = useLocalStorage("fr-bearer-token");

    const fetcher = async (url: string, options: Record<string, any> = {}) => {
        const response = await axios(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: bearerToken ? `Bearer ${bearerToken}` : "",
                "Content-Type": "application/json",
            },
        });

        if (response.data) {
            return response.data;
        } else {
            throw response.statusText;
        }
    };
    
    return fetcher;
}