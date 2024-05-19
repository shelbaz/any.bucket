"use client";
import { usePathname } from "next/navigation";
import { noSidebarPages } from "./Sidebar/Sidebar";

export const Main = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (noSidebarPages.includes(pathname)) {
    return <main>{children}</main>;
  }

  return <main className="lg:pl-72">{children}</main>;
};
