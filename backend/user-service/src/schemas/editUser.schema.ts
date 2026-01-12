import { z } from "zod";

export const EditUserSchema = z.object({
    user_fname: z.string(),
    user_lname: z.string(),
    user_email: z.string(),
    user_country_code: z.string(),
    user_phone: z.string(),
    user_password: z.string(),
    auth_app: z.string(),
    user_role: z.enum(['user','admin']),
    user_status: z.enum(['active','inactive'])
}).strict().partial();

export type EditUserInput = z.infer< typeof EditUserSchema  >