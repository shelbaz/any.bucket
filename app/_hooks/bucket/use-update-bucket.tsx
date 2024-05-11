import { Bucket } from "@/app/_db/bucket";
import { useFetcher } from "../fetcher/use-fetcher";

export const useCreateBucket = () => {
  const fetcher = useFetcher();

  const updateBucket = async (bucketDetails: Bucket) => {
    const response = await fetcher(`/api/bucket/${bucketDetails._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...bucketDetails },
    });
    return response;
  };

  return {
    updateBucket,
  };
};
