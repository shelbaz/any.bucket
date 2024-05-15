"use client";
import { useEffect, useState } from "react";

import { useHasMounted } from "./use-has-mounted";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const hasMounted = useHasMounted();

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);

    if (hasMounted) {
      checkIfMobile();
      window.addEventListener("resize", checkIfMobile);
    }

    return () => window.removeEventListener("resize", checkIfMobile);
  }, [hasMounted]);

  return isMobile;
};
