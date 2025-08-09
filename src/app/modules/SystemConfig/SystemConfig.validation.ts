import { z } from "zod";

export const SystemConfigSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
    }),
});
