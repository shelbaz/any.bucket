"use client";
import { createContext } from "react";
import { SessionData, defaultSession } from "@/app/_lib";

export const SessionContext = createContext<SessionData>(defaultSession);

export const SessionProvider = ({
  session,
  children,
}: {
  session: SessionData;
  children: React.ReactNode;
}) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
