import { ImageGenerateParams } from "openai/resources/images.mjs";
import { useFetcher } from "../fetcher/use-fetcher";
import { useState } from "react";

export const useGenerateImages = () => {
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);

  const generateImages = async (data: {
    description: string;
    count: number;
    size: ImageGenerateParams["size"];
  }) => {
    setIsLoading(true);
    const response = await fetcher("/api/images", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setIsLoading(false);
    return response;
  };

  return {
    generateImages,
    isLoading,
  };
};
