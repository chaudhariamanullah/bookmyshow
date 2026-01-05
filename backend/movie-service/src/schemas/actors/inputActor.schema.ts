import { z } from "zod";

export const createActorSchema = z.object({
    actor_name:z.string().min(3),
    actor_dob:z.coerce.date(),
    actor_country:z.string().min(3),
    actor_city:z.string().min(2),
    actor_spouse:z.string().min(3).optional().nullable()
}).strict();

export type createActorInput = z.infer<typeof createActorSchema>