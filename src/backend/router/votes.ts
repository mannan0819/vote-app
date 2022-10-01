import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { z } from "zod";
import { createRouter } from "./context";

export const votesRouter = createRouter()
  .mutation("create", {
    input: z.object({
      optionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.userToken) return { error: "Unauthorized" };
      return prisma.voting.create({
        data: {
          userToken: ctx.userToken,
          option: {
            connect: {
              id: input.optionId,
            },
          },
        },
      });
    },
  })
  .query("getVotes", {
    input: z.object({
      optionsIds: z.array(z.string()),
    }),
    async resolve({ input, ctx }) {
      const votes = await prisma.voting.findFirst({
        where: {
          optionId: { in: input.optionsIds },
          userToken: { equals: ctx.userToken },
        },
      });
      return votes;
    },
  });
