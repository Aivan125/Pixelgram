import { z } from "zod";

export const createPostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Caption must have at least 5 characters" })
    .max(2200, { message: "Caption must be 2200 characters maximum." }),
  file: z.custom(),
  location: z.string(),
  tags: z.string(),
});
