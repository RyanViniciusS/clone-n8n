import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { email } from 'zod';

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {

    await inngest.send({
      name: 'test/workflow.created',
      data: {
        email: 'ryan@mail.com',
      },
    });

    return { success: true, message: 'Workflow creation event sent to Inngest' };
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;