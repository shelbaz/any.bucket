"use client";

import { Button } from "@/app/_components/buttons/Button";
import { Input } from "@/app/_components/form/Input";
import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";
import { Loader } from "@/app/_components/loaders/Loader";
import { SessionContext } from "@/app/_context/SessionContext";
import { useListWorkspaces } from "@/app/_hooks/files/use-list-workspaces";
import { useUpdateWorkspace } from "@/app/_hooks/workspace/use-update-workspace";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WorkspacePage = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const { session } = useContext(SessionContext);
  const { data: workspacesData, mutate: mutateWorkspaces } =
    useListWorkspaces();

  const { updateWorkspace } = useUpdateWorkspace();
  const currentWorkspace = workspacesData?.workspaces.find(
    (workspace) => workspace._id.toString() === session.workspaceId
  );

  useEffect(() => {
    setWorkspaceName(currentWorkspace?.name ?? "");
  }, [currentWorkspace]);

  const handleSave = async () => {
    if (!currentWorkspace) return;
    const toastId = toast.loading("Saving...");
    await updateWorkspace(currentWorkspace._id.toString(), {
      name: workspaceName,
    });
    toast.success("Workspace updated!", { id: toastId });
  };

  return (
    <>
      <BreadcrumbsTopbar>
        <Breadcrumbs
          basePath="/settings"
          crumbs={[
            { title: "Settings", segment: "/" },
            { title: "Workspace", segment: "" },
          ]}
        />
      </BreadcrumbsTopbar>
      <div className="p-4 lg:p-12 max-w-6xl mx-auto">
        <div className="flex justify-between items-end">
          <h1 className="text-2xl font-semibold text-zinc-800 -mb-1 flex items-center">
            <span>Workspace Details</span>
          </h1>
          <Button
            label="Save Changes"
            onClick={() => {
              mutateWorkspaces();
            }}
            isDisabled={workspaceName === currentWorkspace?.name}
          />
        </div>
        {workspacesData ? (
          <div className="w-full max-w-sm mt-8">
            <form
              className="flex flex-col space-y-4"
              title="If you need to change your email, please email support@file.rocks"
            >
              <div>
                <label
                  htmlFor="rename-file"
                  className="block text-sm font-semibold text-zinc-800 mb-1"
                >
                  Workspace Name
                </label>
                <Input
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
              </div>
            </form>
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <Loader size={24} />
          </div>
        )}
      </div>
    </>
  );
};

export default WorkspacePage;
