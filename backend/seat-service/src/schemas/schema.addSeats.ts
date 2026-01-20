import { z } from "zod";

export const AddSeatsSchema = z.object({
    total_seats:z.string().array().min(1),
    screen_public_id: z.string()
}).strict();

export type AddSeatsInput = z.infer<typeof AddSeatsSchema>;