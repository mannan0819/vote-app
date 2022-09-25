import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { z } from "zod";
import { createRouter } from "./context";

export const optionsRouter = createRouter()
    .mutation("create", {
        input: z.object({
            text: z.string().min(1).max(5000),
            questionId: z.string(),
        }),
        async resolve({ input, ctx }) {
            if (!ctx.userToken) return { error: "Unauthorized" };
            return prisma.option.create({
                data: {
                    text: input.text,
                    voteQuestionId: input.questionId,
                },
            });
        },
    })
    .mutation("createMany", {
        input: z.object({
            options: z.array(
                z.object({
                    text: z.string().min(1).max(5000),
                })
            ),
            questionId: z.string(),
        }),
        async resolve({ input }) {
            return prisma.voteQuestion.update({
                where: {
                    id: input.questionId,
                },
                data: {
                    options: {
                        create: input.options.map((option) => ({
                            text: option.text,
                        })),
                    },
                }
            });
        }
    });
