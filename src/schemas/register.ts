import { z } from "zod";

const today = new Date();
const minDate = new Date();
minDate.setFullYear(today.getFullYear() - 120);

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(30, { message: "Username cannot exceed 30 characters." }),

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
            }),

    firstname: z
        .string()
        .min(2, { message: "First name must be at least 2 characters long." })
        .max(30, { message: "First name cannot exceed 30 characters." }),

    lastname: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters long." })
        .max(30, { message: "Last name cannot exceed 30 characters." }),

    email: z
        .string({ message: "Please enter a valid email address (must include a '@' and a domain end)." })
        .max(100, { message: "Email cannot exceed 100 characters." }),

    dateOfBirth: z
        .string()
        .optional()
        .refine((val) => {
            if (!val) return true; // optional
            const dob = new Date(val);
            return dob >= minDate && dob <= today;
        }, { message: "Date of birth must be within the last 120 years and not in the future." }),

    genderType: z
        .enum(["PREFER_NOT_TO_DISCLOSE", "MALE", "FEMALE", "OTHER"], {
            message: "Please select a gender."
        }),

    favoritePlayer: z
        .string()
        .max(100, { message: "Favorite player name is too long." })
        .optional()
});

export type RegisterFields = z.infer<typeof registerSchema>;