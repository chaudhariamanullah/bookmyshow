import { z } from "zod";

export const addCastSchema = z.object({
    movie_public_id: z.string(),
    actors_public_id: z.array( z.string().trim() ).min(1),
    roles: z.array( z.string().trim() ).min(1),
}).strict();

export type addCastInput = z.infer< typeof addCastSchema >;