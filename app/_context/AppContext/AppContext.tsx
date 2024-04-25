"use client";
import { createContext, useState } from "react";

interface AppContextType {
  fileLayout?: "list" | "grid";
  setFileLayout?: (layout: "list" | "grid") => void;
  renameFileModal: {
    isOpen: boolean;
    name: string;
    objectKey: string;
  };
  setRenameFileModal: (modal: {
    isOpen: boolean;
    name: string;
    objectKey: string;
  }) => void;
}

const initialValue: AppContextType = {
  fileLayout: "list",
  setFileLayout: () => {},
  renameFileModal: {
    isOpen: false,
    name: "",
    objectKey: "",
  },
  setRenameFileModal: () => {},
};

export const AppContext = createContext<AppContextType>(initialValue);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [fileLayout, setFileLayout] = useState<AppContextType["fileLayout"]>(
    initialValue.fileLayout
  );
  const [renameFileModal, setRenameFileModal] = useState<
    AppContextType["renameFileModal"]
  >(initialValue.renameFileModal);

  return (
    <AppContext.Provider
      value={{
        fileLayout,
        setFileLayout,
        renameFileModal,
        setRenameFileModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
