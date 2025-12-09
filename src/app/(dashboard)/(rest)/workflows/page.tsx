import { WorflowsContainer, WorflowsError, WorflowsList, WorflowsLoading } from "@/features/workflows/components/worflows";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  searchParams: Promise<SearchParams>;
};
const page = async ({ searchParams }: Props) => {
  await requireAuth();
  const params = await workflowsParamsLoader(searchParams);
  prefetchWorkflows(params);

  return (
    <WorflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorflowsError />}>
          <Suspense fallback={<WorflowsLoading />}>
            <WorflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorflowsContainer>
  );
};

export default page;
