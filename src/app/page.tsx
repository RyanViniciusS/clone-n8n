"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout";
import { toast } from "sonner";

const Dashboard = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(trpc.testAi.mutationOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow creation event sent to Inngest");
      },
    })
  );

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Protected client component
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button onClick={() => testAi.mutate()}>test ai</Button>
      <Button onClick={() => create.mutate()}>create workflow</Button>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
