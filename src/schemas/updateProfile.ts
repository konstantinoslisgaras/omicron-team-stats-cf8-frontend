import { z } from "zod";

const today = new Date();
const minDate = new Date();
minDate.setFullYear(today.getFullYear() - 120);

export const updateProfileSchema = z.object({
    firstname: z.string()
        .min(2, "First name must be at least 2 characters")
        .max(30, "First name cannot exceed 30 characters"),

    lastname: z.string()
        .min(2, "Last name must be at least 2 characters")
        .max(30, "Last name cannot exceed 30 characters"),

    password: z
        .string()
        .min(8,
            { message: "Password must be at least 8 characters long." })
        .max(30,
            { message: "Password cannot exceed 30 characters." })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%&*]).{8,}$/,
            {
                message:
                    "Password must include an uppercase, a lowercase, a number, and a special character and must be at least 8 characters long.",
            })
        .optional(),

    dateOfBirth: z.string()
        .refine((val) => {
            if (!val) return true;
            const date = new Date(val);
            return date >= minDate && date <= today;
        }, "Date of birth must be in the past and within the last 120 years")
        .optional(),

    supportedPlayerId: z.string().min(1, "Please select a supported player"),

    favoriteLegend: z.string()
        .max(30, "Favorite legend name cannot exceed 30 characters")
        .optional(),
});

export type UpdateProfileFields = z.infer<typeof updateProfileSchema>;