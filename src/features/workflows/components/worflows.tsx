"use client";
import { formatDistanceToNow } from "date-fns";

import {
  EmptyView,
  EntityConainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import { userCreateWorflow, useRemoveWorflow, useSupenseWorkflows } from "../hooks/use-worflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { userWorkglowsParms } from "../hooks/use-worflows-params";
import { EntityPagination, useEntitySearch } from "@/hooks/use-entity-search";
import type { Workflow } from "@/generated/prisma";
import { WorkflowIcon } from "lucide-react";

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

  return (
    <EntityList
      items={workflowsQuery.data.items}
      getKey={(worflow) => worflow.id}
      renderItem={(workflow) => <WorkflowItem data={workflow} />}
      emptyView={<WorflowsEmpty />}
    />
  );
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

export const WorflowsLoading = () => {
  return <LoadingView message="Loading workflows." />;
};

export const WorflowsError = () => {
  return <ErrorView message="Error loading workflows." />;
};

export const WorflowsEmpty = () => {
  const router = useRouter();
  const createWorkflow = userCreateWorflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
    });
  };
  return (
    <>
      {modal}
      <EmptyView onNew={handleCreate} message="You haven't created any worflows yet. Get started by creating your firts workflow" />;
    </>
  );
};

export const WorkflowItem = ({ data }: { data: Workflow }) => {
  const removeWorkflow = useRemoveWorflow();
  const handleRemove = () => {
    removeWorkflow.mutate({ id: data.id });
  };

  return (
    <EntityItem
      href={`workflows/${data.id}`}
      title={data.name}
      subtitle={
        <span className="text-muted-foreground">
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })} • Created{" "}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}
        </span>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  );
};
