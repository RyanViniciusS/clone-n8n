"use client";
import { EntityConainer, EntityHeader } from "@/components/entity-components";
import { userCreateWorflow, useSupenseWorkflows } from "../hooks/use-worflows";
import { error } from "console";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/router";

export const WorflowsList = () => {
  const workflowsQuery = useSupenseWorkflows();
  return <p className="flex-1 justify-center items-center">{JSON.stringify(workflowsQuery.data, null, 2)}</p>;
};

export const WorflowsHeader = ({ disable }: { disable?: boolean }) => {
  const createWorkflow = userCreateWorflow();
  const router = useRouter();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
  return (
    <>
      {modal}
      <EntityHeader
        title="Worflows"
        description="create and manage your worflows"
        onNewClick={handleCreate}
        newButtonLabel="New workflow"
        disabled={disable ?? false}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

export const WorflowsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityConainer header={<WorflowsHeader />} search={<></>} pagination={<></>}>
      {children}
    </EntityConainer>
  );
};
