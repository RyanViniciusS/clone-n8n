import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),

  testAi: protectedProcedure.mutation(async () => {
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: 'quem descobriu o brasil?',
    });

    return { text };
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