import { z } from "zod";

export const TestAttemptSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
    }),
});
