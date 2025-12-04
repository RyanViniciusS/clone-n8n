"use client";
import { EntityConainer, EntityHeader, EntitySearch } from "@/components/entity-components";
import { userCreateWorflow, useSupenseWorkflows } from "../hooks/use-worflows";
import { error } from "console";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { userWorkglowsParms } from "../hooks/use-worflows-params";
import { EntityPagination, useEntitySearch } from "@/hooks/use-entity-search";

export const WorflowsSearch = () => {
  const [params, setParams] = userWorkglowsParms();
  const { searchValue, onSearchChange } = useEntitySearch({
    parms: params,
    setParams,
  });

  return <EntitySearch value={searchValue} onChange={onSearchChange} placeholder="Search worflows" />;
};
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

export const WorflowsPagination = () => {
  const worflows = useSupenseWorkflows();
  const [parms, setParams] = userWorkglowsParms();

  return (
    <EntityPagination
      disabled={worflows.isFetching}
      totalPages={worflows.data.totalPages}
      page={worflows.data.page}
      onPageChange={(page) => setParams({ ...parms, page })}
    />
  );
};

export const WorflowsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityConainer header={<WorflowsHeader />} search={<WorflowsSearch />} pagination={<WorflowsPagination />}>
      {children}
    </EntityConainer>
  );
};
