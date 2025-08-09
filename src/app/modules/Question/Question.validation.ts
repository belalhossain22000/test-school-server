import { z } from "zod";

export const QuestionSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
    }),
});
