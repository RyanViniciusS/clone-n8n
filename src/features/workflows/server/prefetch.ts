import type { inferInput } from "@trpc/tanstack-react-query";
import { trpc, prefetch } from "@/trpc/server";

type input = inferInput<typeof trpc.worflows.getMany>;

export const prefetchWorkflows = async (parms: input) => {
    return prefetch(trpc.worflows.getMany.queryOptions(parms));
};