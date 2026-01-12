import { z } from "zod";

export const addTheatreSchema = z.object({
    theatre_name: z.string().min(3),
    theatre_image: z.string(),
    theatre_country: z.string(),
    theatre_city: z.string(),
    theatre_address: z.string(),
    theatre_status: z.number()
}).strict();

export type addTheatreInput = z.infer< typeof addTheatreSchema >;