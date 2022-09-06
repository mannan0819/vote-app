import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { z } from "zod";

export const questionRouter = trpc.router().query("getAll", {
  async resolve() {
    return prisma.voteQuestion.findMany();
  },
});
