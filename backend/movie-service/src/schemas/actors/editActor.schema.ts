import { z } from "zod";

export const editActorSchema = z.object({
    actor_name:z.string().min(3),
    actor_dob:z.coerce.date(),
    actor_country:z.string().min(3),
    actor_city:z.string().min(2),
    actor_spouse:z.string().min(3).optional().nullable()
}).strict().partial();

export type editActorInput = z.infer< typeof editActorSchema >;
