import { ImageGenerateParams } from "openai/resources/images.mjs";
import { useFetcher } from "../fetcher/use-fetcher";
import { useState } from "react";

export const useGenerateImages = () => {
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);

  const generateImages = async (data: {
    description: ImageGenerateParams["prompt"];
    count: ImageGenerateParams["n"];
    size: ImageGenerateParams["size"];
    model: ImageGenerateParams["model"];
    quality?: ImageGenerateParams["quality"];
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
