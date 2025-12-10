"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";

const page = () => {
  const trpc = useTRPC();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

  const testAi = useMutation({
    ...trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("Sucess");
      },
      onError: (error: any) => {
        toast.error(`Error: ${error.message}`);
      },
    }),
  });

  const handleClick = () => {
    if (!hasActiveSubscription) {
      toast.error("Você precisa de uma assinatura ativa para usar esta funcionalidade");
      return;
    }
    testAi.mutate();
  };

  return (
    <Button 
      onClick={handleClick} 
      disabled={!hasActiveSubscription || isLoading || testAi.isPending}
    >
      Execute AI
    </Button>
  );
};

export default page;
