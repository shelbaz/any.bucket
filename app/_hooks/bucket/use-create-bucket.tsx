import { Bucket } from "@/app/_db/bucket";
import { useFetcher } from "../fetcher/use-fetcher";

export const useCreateBucket = () => {
  const fetcher = useFetcher();

  const createBucket = async (bucketDetails: Omit<Bucket, "_id">) => {
    const response = await fetcher(`/api/bucket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...bucketDetails },
    });
    return response;
  };

  return {
    createBucket,
  };
};
