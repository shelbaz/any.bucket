"use client";
import { useParams } from "next/navigation";
import { createContext, useMemo, useState } from "react";
import { useQueryState } from "nuqs";

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
  moveFileModal: {
    isOpen: boolean;
    objectKey: string;
  };
  setMoveFileModal: (modal: { isOpen: boolean; objectKey: string }) => void;
  newFolderModal: {
    isOpen: boolean;
  };
  setNewFolderModal: (modal: { isOpen: boolean }) => void;
  page: string;
  setPage: (page: string) => void;
  pageSize: string;
  setPageSize: (size: string) => void;
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
  moveFileModal: {
    isOpen: false,
    objectKey: "",
  },
  setMoveFileModal: () => {},
  newFolderModal: {
    isOpen: false,
  },
  setNewFolderModal: () => {},
  page: "1",
  setPage: () => {},
  pageSize: "24",
  setPageSize: () => {},
};

export const AppContext = createContext<AppContextType>(initialValue);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const [pageSize, setPageSize] = useQueryState("size", { defaultValue: "24" });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [fileLayout, setFileLayout] = useState<AppContextType["fileLayout"]>(
    initialValue.fileLayout
  );
  const [renameFileModal, setRenameFileModal] = useState<
    AppContextType["renameFileModal"]
  >(initialValue.renameFileModal);
  const [moveFileModal, setMoveFileModal] = useState<
    AppContextType["moveFileModal"]
  >(initialValue.moveFileModal);
  const [newFolderModal, setNewFolderModal] = useState<
    AppContextType["newFolderModal"]
  >(initialValue.newFolderModal);

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
        moveFileModal,
        setMoveFileModal,
        newFolderModal,
        setNewFolderModal,
        page,
        setPage,
        pageSize,
        setPageSize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
