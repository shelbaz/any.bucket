"use client";
import { createContext } from "react";
import { SessionData, defaultSession } from "@/app/_lib";

export const SessionContext = createContext<{
  session: SessionData;
  updateSession: (session: SessionData) => Promise<void>;
}>({
  session: defaultSession,
  updateSession: async () => {},
});

export const SessionProvider = ({
  session,
  updateSession,
  children,
}: {
  session: SessionData;
  updateSession: (session: Partial<SessionData>) => Promise<void>;
  children: React.ReactNode;
}) => {
  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};
