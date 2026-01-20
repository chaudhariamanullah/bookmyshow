import { z } from "zod";

export const AddBookingSchema = z.object({
    seat_public_id:z.string(),
    showtime_public_id:z.string()
}).strict();


export type AddBookingInput = z.infer< typeof AddBookingSchema >;