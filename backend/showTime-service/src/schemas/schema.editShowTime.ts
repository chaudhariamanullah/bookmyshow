import { z } from "zod";

export const EditShowTimeSchema = z.object({
    movie_id: z.string(),
    theater_id: z.string(),
    screen_id: z.string(),
    dateTime: z.coerce.date()
}).strict().partial();

export type EditShowTimeInput = z.infer< typeof EditShowTimeSchema >;