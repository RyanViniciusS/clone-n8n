import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/workflow.created" },
    async ({ event, step }) => {
        await step.sleep("rfetching", "5s");

        await step.sleep("trancribing", "5s");

        await step.sleep("sending", "5s");

        await step.run("create-workflow", async () => {
            return prisma.workflow.create({
                data: {
                    name: "workflow-from-inngest",
                },
            });
        });
        
    },
);