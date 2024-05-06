"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

export const EnsureBearerToken = () => {
  const passwordEnabled = process.env.NEXT_PUBLIC_PASSWORD_ENABLED === "true";
  const router = useRouter();
  const pathname = usePathname();
  const [bearerToken] = useLocalStorage("fr-bearer-token");

  useEffect(() => {
    if (passwordEnabled && !bearerToken && !pathname.includes("/password")) {
      router.push("/password");
    }
  }, [router, passwordEnabled, bearerToken, pathname]);

  return null;
};
