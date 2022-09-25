import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { z } from "zod";
import { createRouter } from "./context";

export const questionRouter = createRouter()
  .query("getById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const question = await prisma.voteQuestion.findFirst({
        where: { id: input.id },
        include: {
          options: true
        },
      });

      return { question, isOwner: question?.userToken === ctx.userToken };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      if (!ctx.userToken) { return []; }
      return prisma.voteQuestion.findMany({ where: { userToken: ctx.userToken } });
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(5).max(600),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.userToken) return { error: "Unauthorized" };
      return prisma.voteQuestion.create({
        data: {
          question: input.question,
          userToken: ctx.userToken,
        },
      });
    },
  });
