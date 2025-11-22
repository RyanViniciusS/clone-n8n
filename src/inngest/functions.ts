import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from 'ai';

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
    { id: "execute-ai" },
    { event: "execute/ai" },
    async ({ event, step }) => {
        const { steps } = await step.ai.wrap(
            "gemini-generateText",
            generateText,
            {
                model: google('gemini-2.5-flash'),
                system: 'you are a helpful assistant that only answers math questions.',
                prompt: `waht is 2+2?`,
            });

        console.log("AI Steps:", steps);
        return steps;
    }
);