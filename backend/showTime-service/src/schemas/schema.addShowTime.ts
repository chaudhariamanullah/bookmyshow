import { z } from "zod";

export const AddShowTimeSchema = z.object({
    movie_id: z.string(),
    theater_id: z.string(),
    screen_id: z.string(),
    dateTime: z.coerce.date(),
    showtime_status: z.enum(['active','housefull','cancel'])
}).strict();

export type AddShowTimeInput = z.infer< typeof AddShowTimeSchema >;