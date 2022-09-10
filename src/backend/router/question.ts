import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { z } from "zod";

export const questionRouter = trpc
  .router()
  .query("getById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return prisma.voteQuestion.findFirst({ where: { id: input.id } });
    },
  })
  .query("getAll", {
    async resolve() {
      return prisma.voteQuestion.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(5).max(600),
    }),
    async resolve({ input }) {
      return prisma.voteQuestion.create({
        data: { question: input.question },
      });
    },
  });
