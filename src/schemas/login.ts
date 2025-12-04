import { z } from "zod";

export const loginSchema = z.object({
    username: z.string()
        .min(1, {error: "Invalid Username"}),
    password: z.string()
        .min(7, {error: "Invalid Password"}),
});

export type LoginFields = z.infer<typeof loginSchema>;