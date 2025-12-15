import { generateSlug } from "random-word-slugs";
import prisma from "@/lib/db";
import { createTRPCRouter, premiunProcedure, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { PAGINATION } from "@/config/constants";
import { NodeType } from "@/generated/prisma";

export const workflowsRouter = createTRPCRouter({
  create: premiunProcedure.mutation(async ({ ctx }) => {
    return prisma.workflow.create({
      data: {
        name: generateSlug(3, { format: "title" }),
        userId: ctx.auth.user.id,
        nodes: {
          create: {
            name: NodeType.INITIAL,
            type: NodeType.INITIAL,
            position: { x: 250, y: 100 },
            
          }
        }
      },
    });
  }),
  remove: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    return prisma.workflow.delete({
      where: {
        id: input.id,
        userId: ctx.auth.user.id,
      },
    });
  }),

  updateName: protectedProcedure.input(z.object({ id: z.string(), name: z.string() })).mutation(async ({ ctx, input }) => {
    return prisma.workflow.update({
      where: {
        id: input.id,
        userId: ctx.auth.user.id,
      },
      data: {
        name: input.name,
      },
    });
  }),
  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return prisma.workflow.findUnique({
      where: {
        id: input.id,
        userId: ctx.auth.user.id,
      },
    });
  }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFALT_PAGE),
        pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFALT_PAGE_SIZE),
        search: z.string().default(""),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;

      const baseWhere = {
        userId: ctx.auth.user.id,
        ...(search
          ? {
            name: {
              contains: search,
            },
          }
          : {}),
      };

      const [items, totalCount] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: baseWhere,
          orderBy: {
            updatedAt: "desc",
          },
        }),
        prisma.workflow.count({
          where: baseWhere,
        }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),
});
