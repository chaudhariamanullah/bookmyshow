import { z } from "zod";

export const LocalLoginSchema = z.object({
    email: z.string(),
    password: z.string()
}).strict();

export type LocalLoginInput = z.infer< typeof LocalLoginSchema >;
