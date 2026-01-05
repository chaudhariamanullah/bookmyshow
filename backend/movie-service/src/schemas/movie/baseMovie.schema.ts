import { z } from "zod"

export const createMovieSchema = z.object({
  title: z.string().min(1),
  poster_url: z.string(),
  released_at: z.coerce.date()
}).strict();

export type CreateMovieInput = z.infer<typeof createMovieSchema>
