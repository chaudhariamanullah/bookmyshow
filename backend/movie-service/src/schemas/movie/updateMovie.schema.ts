import { z} from "zod";

export const updateMovieSchema = z.object({
  title: z.string().min(1),
  poster_url: z.string(),
  released_at: z.coerce.date()
}).partial().strict();

export type updateMovieInput = z.infer<typeof updateMovieSchema>;