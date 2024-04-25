import { _Object } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import { useLocalStorage } from "react-use";

export const useVerifyPassword = () => {
  const [bearerToken, setBearerToken] = useLocalStorage("fr-bearer-token");
  const verifyPassword = async ({ password }: { password: string }) => {
    try {
      const response = await fetch("/api/password/verify", {
        method: "POST",
        body: JSON.stringify({
          password,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to verify password.");
        return false;
      }

      const responseBody = await response.json();
      if (!responseBody.verified) {
        toast.error("Password is incorrect.");
        return false;
      }

      setBearerToken(responseBody.secret);
      toast.success("Password verified successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to verify password.");
      return false;
    }
  };

  return {
    verifyPassword,
    bearerToken,
  };
};
