"use server";

import { logout } from "@/app/_lib/session";

export const LogoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <form action={logout} className="cursor-pointer">
      <button type="submit">{children}</button>
    </form>
  );
};
