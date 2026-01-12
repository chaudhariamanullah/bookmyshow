import { z } from "zod";

export const editTheatreSchema = z.object({
    theatre_name: z.string().min(3).optional(),
    theatre_image: z.string().optional(),
    theatre_country: z.string().optional(),
    theatre_city: z.string().optional(),
    theatre_address: z.string().optional(),
    theatre_status: z.number().optional()
}).strict();

export type EditTheatreInput = z.infer<typeof editTheatreSchema>;