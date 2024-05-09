"use server";

import { SessionData } from "@/app/_lib";
import { getSession, logout } from "@/app/_lib/session";

export const LogoutWrapper = async ({
  children,
}: {
  children: React.FC<SessionData>;
}) => {
  const session = await getSession();
  return <form action={logout}>{children(session)}</form>;
};
