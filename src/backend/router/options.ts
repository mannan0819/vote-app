import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { z } from "zod";
import { createRouter } from "./context";

export const optionsRouter = createRouter()
    .mutation("create", {
        input: z.object({
            text: z.string().min(5).max(600),
            value: z.string().min(5).max(600),
            questionId: z.string(),
        }),
        async resolve({ input, ctx }) {
            if (!ctx.userToken) return { error: "Unauthorized" };
            return prisma.option.create({
                data: {
                    text: input.text,
                    value: input.value,
                    voteQuestionId: input.questionId,
                },
            });
        },
    });
