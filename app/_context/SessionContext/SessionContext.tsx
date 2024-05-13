"use client";
import { createContext } from "react";
import { SessionData, defaultSession } from "@/app/_lib";
import { IronSession } from "iron-session";

export const SessionContext = createContext<{
  session: SessionData;
  updateSession: (session: SessionData) => Promise<IronSession<SessionData>>;
}>({
  session: defaultSession,
  updateSession: async () => defaultSession as IronSession<SessionData>,
});

export const SessionProvider = ({
  session,
  updateSession,
  children,
}: {
  session: SessionData;
  updateSession: (
    session: Partial<SessionData>
  ) => Promise<IronSession<SessionData>>;
  children: React.ReactNode;
}) => {
  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};
