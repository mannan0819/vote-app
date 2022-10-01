import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { questionRouter } from "./question";
import { z } from "zod";
import superjson from "superjson";
import { createRouter } from "./context";
import { optionsRouter } from "./options";
import { votesRouter } from "./votes";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("question.", questionRouter)
  .merge("options.", optionsRouter)
  .merge("votes.", votesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
