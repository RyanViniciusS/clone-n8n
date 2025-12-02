import { WorflowsContainer, WorflowsList } from "@/features/workflows/components/worflows";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";


const page = async () => {
  await requireAuth();
  prefetchWorkflows();
  return (
    <WorflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error!</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <WorflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorflowsContainer>
  );
};

export default page;
