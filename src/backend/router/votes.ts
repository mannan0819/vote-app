import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { z } from "zod";
import { createRouter } from "./context";

export const votesRouter = createRouter().mutation("create", {
  input: z.object({
    optionId: z.string(),
  }),
  async resolve({ input, ctx }) {
    if (!ctx.userToken) return { error: "Unauthorized" };
    return prisma.votes.create({
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
});
