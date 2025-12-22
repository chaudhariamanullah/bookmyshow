import { z } from "zod";

export const createLanguageSchema = z.object({
    languageIds: z.array(z.string())
});

export type createLanguageSchema = z.infer<typeof createLanguageSchema>