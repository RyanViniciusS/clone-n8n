import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSupenseWorkflows = () => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.worflows.getMany.queryOptions() // passa undefined como input
    );
}

export const userCreateWorflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    return useMutation(trpc.worflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`worflow ${data.name} created`)
            queryClient.invalidateQueries(
                trpc.worflows.getMany.queryOptions()
            )
        },
        onError: (error) => {
            toast.error(`falied to create worflow: ${error.message}`)
        }
    }))
}

