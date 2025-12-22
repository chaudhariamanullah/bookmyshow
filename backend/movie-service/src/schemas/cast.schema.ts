import { z } from "zod";

export const movieCastSchema = z.object({
    castIds: z.array(z.string())
})

export type movieCastSchema = z.infer<typeof movieCastSchema>