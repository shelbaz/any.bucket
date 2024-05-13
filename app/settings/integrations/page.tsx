"use client";
import { Button } from "@/app/_components/buttons/Button";
import { OptionCard } from "@/app/_components/cards/OptionCard";
import { DocumentsEmptyState } from "@/app/_components/empty-states/DocumentsEmptyState";
import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";
import { Loader } from "@/app/_components/loaders/Loader";
import { CreateOrUpdateIntegrationModal } from "@/app/_components/modals/CreateOrUpdateIntegrationModal/CreateOrUpdateIntegrationModal";
import { SessionContext } from "@/app/_context/SessionContext";
import { Integration } from "@/app/_db/integration";
import { getIntegrationLabel } from "@/app/_helpers/integrations/integration-options";
import { useCreateKey } from "@/app/_hooks/key/use-create-key";
import { useListKeys } from "@/app/_hooks/key/use-list-keys";
import { useUpdateKey } from "@/app/_hooks/key/use-update-key";
import { PlusIcon } from "@heroicons/react/16/solid";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { use, useState } from "react";

const KeysPage = () => {
  const { session } = use(SessionContext);
  const {
    data: keysData,
    mutate: mutateKeys,
    isLoading,
  } = useListKeys({
    workspaceId: session.workspaceId,
  });
  const { createKey } = useCreateKey({ workspaceId: session.workspaceId });
  const { updateKey } = useUpdateKey({ workspaceId: session.workspaceId });
  const [
    createOrUpdateIntegrationModalIsOpen,
    setCreateOrUpdateIntegrationModalIsOpen,
  ] = useState(false);
  const [integrationId, setIntegrationId] = useState<ObjectId | null>(null);
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);

  const handleResetForm = () => {
    setSelectedIntegration(null);
    setIntegrationId(null);
  };

  const handleCloseModal = () => {
    setCreateOrUpdateIntegrationModalIsOpen(false);
    setTimeout(handleResetForm, 300);
  };

  const handleCreateOrUpdate = async (
    integration: Omit<
      Integration,
      "workspaceId" | "_id" | "updatedAt" | "createdAt"
    >
  ) => {
    if (!integration) return;

    let response;
    if (!integrationId) {
      response = await createKey(integration);
    } else {
      response = await updateKey(integrationId, integration);
    }

    if (response) {
      handleResetForm();
    }
  };

  console.log(selectedIntegration);

  return (
    <>
      <BreadcrumbsTopbar>
        <Breadcrumbs
          basePath="/settings"
          crumbs={[
            { title: "Settings", segment: "/" },
            { title: "Keys", segment: "" },
          ]}
        />
      </BreadcrumbsTopbar>
      <div className="p-4 lg:p-12 max-w-6xl mx-auto">
        <div className="flex justify-between items-end">
          <h1 className="text-2xl font-semibold text-zinc-800 -mb-1 flex items-center">
            <span>Integrations</span>
            {keysData?.integrations.length ? (
              <span className="h-5 w-5 ml-2 -mb-0.5 text-xs font-extrabold bg-zinc-200 text-zinc-700 rounded-full items-center justify-center flex">
                {keysData.integrations.length}
              </span>
            ) : (
              ""
            )}
          </h1>
          <Button
            variant="primary"
            label="Add Integration"
            onClick={() => {
              setCreateOrUpdateIntegrationModalIsOpen(true);
            }}
            Icon={<PlusIcon className="h-4 w-4" />}
          />
        </div>
        <ul className="mt-6 flex flex-col space-y-4">
          {keysData?.integrations.length === 0 && (
            <DocumentsEmptyState
              title="No Integrations Yet"
              description="Click 'Add Integration' in the top-right to get started."
            />
          )}
          {keysData?.integrations.map((integration) => (
            <OptionCard
              key={integration._id.toString()}
              title={getIntegrationLabel(integration.name)}
              options={[
                {
                  label: "Edit Details",
                  action: () => {
                    setIntegrationId(integration._id);
                    setSelectedIntegration(integration);
                    setCreateOrUpdateIntegrationModalIsOpen(true);
                  },
                },
              ]}
              icon={
                <div className="h-16 w-16 flex items-center justify-center overflow-hidden rounded-md bg-white relative">
                  <Image
                    src={`/images/icons/providers/${integration.name}.svg`}
                    alt={integration.name}
                    height={48}
                    width={48}
                  />
                </div>
              }
            />
          ))}
          {isLoading && (
            <div className="flex items-center justify-center h-48">
              <Loader size={24} />
            </div>
          )}
        </ul>
      </div>

      <CreateOrUpdateIntegrationModal
        isOpen={createOrUpdateIntegrationModalIsOpen}
        handleClose={handleCloseModal}
        handleSave={handleCreateOrUpdate}
        key={selectedIntegration?.key}
        name={selectedIntegration?.name ?? "openai"}
        integrationId={selectedIntegration?._id}
      />
    </>
  );
};

export default KeysPage;
