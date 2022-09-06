import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { questionRouter } from "./question";
import { z } from "zod";
import superjson from "superjson";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("question.", questionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
