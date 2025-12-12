import prisma from "@/lib/db";
import { inngest } from "./client";
import * as Sentry from "@sentry/nextjs"
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from 'ai';

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
    { id: "execute-ai" },
    { event: "execute/ai" },
    async ({ event, step }) => {

        console.log("Received event:");

        Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })

        const { steps } = await step.ai.wrap(
            "gemini-generateText",
            generateText,
            {
                model: google('gemini-2.5-flash'),
                system: 'you are a helpful assistant that only answers math questions.',
                prompt: `waht is 2+2?`,
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true,
                }
            });

        console.log("AI Steps:", steps);
        return steps;
    }
);