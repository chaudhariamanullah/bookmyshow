import { z } from "zod";

export const LocalSignupSchema = z.object({
    first_name:z.string(),
    last_name:z.string(),
    email:z.string(),
    country_code:z.string(),
    phone:z.string(),
    password:z.string(),
    role: z.enum(['user','admin']),
    status: z.enum(['active','inactive'])
});

export type LocalSignupInput = z.infer< typeof LocalSignupSchema >;