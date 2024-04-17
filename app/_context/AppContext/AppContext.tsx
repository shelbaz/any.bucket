"use client";
import { createContext, useState } from "react";

interface AppContextType {
  fileLayout?: "list" | "grid";
  setFileLayout?: (layout: "list" | "grid") => void;
}

const initialValue: AppContextType = {
  fileLayout: "list",
  setFileLayout: () => {},
};

export const AppContext = createContext<AppContextType>(initialValue);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [fileLayout, setFileLayout] = useState<AppContextType["fileLayout"]>(
    initialValue.fileLayout
  );

  return (
    <AppContext.Provider value={initialValue}>{children}</AppContext.Provider>
  );
};
