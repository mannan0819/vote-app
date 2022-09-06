import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { z } from "zod";

export const questionRouter = trpc
  .router()
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
