"use client";
import { usePathname } from "next/navigation";

export const Main = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (pathname.includes("/login") || pathname.includes("/signup")) {
    return <main>{children}</main>;
  }

  return <main className="lg:pl-72">{children}</main>;
};
