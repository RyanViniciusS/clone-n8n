import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { userWorkglowsParms } from "./use-worflows-params";

export const useSupenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = userWorkglowsParms();
  return useSuspenseQuery(
    trpc.worflows.getMany.queryOptions(params) // passa undefined como input
  );
};

export const userCreateWorflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.worflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`worflow ${data.name} created`);
        queryClient.invalidateQueries(trpc.worflows.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`falied to create worflow: ${error.message}`);
      },
    })
  );
};

export const useRemoveWorflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.worflows.remove.mutationOptions({
      onSuccess: (data) => {
        toast.success(`workflow "${data.name}" deleted`);

        queryClient.invalidateQueries(trpc.worflows.getMany.queryOptions({}));

        queryClient.invalidateQueries(trpc.worflows.getOne.queryFilter({ id: data.id }));
      },
    })
  );
};

export const useSupenseWorkflow = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(
    trpc.worflows.getOne.queryOptions({ id }) // passa undefined como input
  );
};


export const userUpdateWorflowName = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.worflows.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.success(`worflow ${data.name} updated`);
        queryClient.invalidateQueries(trpc.worflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(trpc.worflows.getOne.queryOptions({ id: data.id }));
      },
      onError: (error) => {
        toast.error(`falied to update worflow: ${error.message}`);
      },
    })
  );
};
