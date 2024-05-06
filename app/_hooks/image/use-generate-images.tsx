import { ImageGenerateParams } from "openai/resources/images.mjs";
import { useFetcher } from "../fetcher/use-fetcher";
import { useState } from "react";
import toast from "react-hot-toast";

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

    try {
      const response = await fetcher("/api/images", {
        method: "POST",
        data,
      });

      setIsLoading(false);
      return response;
    } catch (e) {
      toast.error("Failed to generate images");
      setIsLoading(false);
    }
  };

  return {
    generateImages,
    isLoading,
  };
};
