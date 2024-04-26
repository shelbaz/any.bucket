"use client";
import { useParams } from "next/navigation";
import { createContext, useMemo, useState } from "react";

interface AppContextType {
  folder: string;
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
  folder: "",
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
  const params = useParams();
  const [fileLayout, setFileLayout] = useState<AppContextType["fileLayout"]>(
    initialValue.fileLayout
  );
  const [renameFileModal, setRenameFileModal] = useState<
    AppContextType["renameFileModal"]
  >(initialValue.renameFileModal);

  const folder = useMemo(() => {
    return typeof params.folder === "object"
      ? params.folder.join("/")
      : params.folder;
  }, [params]);

  return (
    <AppContext.Provider
      value={{
        folder,
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
