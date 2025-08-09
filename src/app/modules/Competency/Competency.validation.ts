// validation/competency.ts
import { z } from "zod";

 
export const competencyCreateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be at most 100 characters" })
    .transform((s) => s.trim()),
  description: z
    .string()
    .max(1000, { message: "Description must be at most 1000 characters" })
    .transform((s) => s.trim()),
  order: z.preprocess(
    (val) => {
      // allow strings like "0" or "1" from form-data/JSON
      if (typeof val === "string" && val.trim() !== "") return Number(val);
      return val;
    },
    z
      .number({ invalid_type_error: "Order must be a number" })
      .int({ message: "Order must be an integer" })
      .min(0, { message: "Order must be >= 0" })
  ),
});




export const competencyUpdateSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name must be at most 100 characters" })
      .transform((s) => s.trim())
      .optional(),
  
    description: z
      .string()
      .max(1000, { message: "Description must be at most 1000 characters" })
      .transform((s) => s.trim())
      .optional(),
  
    order: z
      .preprocess(
        (val) => {
          if (typeof val === "string" && val.trim() !== "") return Number(val);
          return val;
        },
        z
          .number({ invalid_type_error: "Order must be a number" })
          .int({ message: "Order must be an integer" })
          .min(0, { message: "Order must be >= 0" })
      )
      .optional()
  });
  