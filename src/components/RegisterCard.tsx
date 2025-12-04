import React, { useState } from "react";
import type { RegisterCardProps, RegisterFieldsProps } from "../types/types.ts";
import { registerSchema } from "../schemas/register";

const GENDER_OPTIONS = [
    { value: "PREFER_NOT_TO_DISCLOSE", label: "Prefer not to disclose" },
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" }
];

// Define local form state type (matches RegisterFields but with empty strings)
type FormState = Omit<RegisterFieldsProps, "dateOfBirth" | "favoritePlayer"> & {
    dateOfBirth: string;
    favoritePlayer: string;
};

// InputField component props
interface InputFieldProps {
    name: keyof FormState;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: "text" | "password" | "email";
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   name,
                                                   label,
                                                   value,
                                                   onChange,
                                                   placeholder = "",
                                                   type = "text",
                                                   error
                                               }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-oly-red focus:border-transparent transition-all ${
                error ? "border-red-500" : "border-gray-300"
            }`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const RegisterCard: React.FC<RegisterCardProps> = ({ onRegister, loading, error }) => {
    const [form, setForm] = useState<FormState>({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        dateOfBirth: "",
        favoritePlayer: "",
        genderType: "PREFER_NOT_TO_DISCLOSE"
    });

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleGenderChange = (value: string) => {
        setForm(prev => ({ ...prev, genderType: value }));
        if (validationErrors.genderType) {
            setValidationErrors(prev => ({ ...prev, genderType: "" }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const dataForValidation: RegisterFieldsProps = {
            ...form,
            dateOfBirth: form.dateOfBirth || undefined,
            favoritePlayer: form.favoritePlayer || undefined
        };

        const result = registerSchema.safeParse(dataForValidation);

        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.issues.forEach((err) => {
                const field = err.path?.[0];
                if (field && typeof field === "string") {
                    errors[field] = err.message;
                }
            });
            setValidationErrors(errors);
            return;
        }

        const { data } = result; // TS now knows success = true
        setValidationErrors({});
        onRegister(data);
    };

    return (
        <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl m-10 p-6 border border-gray-200 mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-oly-red-dark">Create Account</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username */}
                <InputField
                    name="username"
                    label="Username"
                    placeholder="Enter username..."
                    value={form.username}
                    onChange={handleChange}
                    error={validationErrors.username}
                />

                {/* Password */}
                <InputField
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter password..."
                    value={form.password}
                    onChange={handleChange}
                    error={validationErrors.password}
                />

                {/* First name */}
                <InputField
                    name="firstname"
                    label="First Name"
                    placeholder="Enter firstname..."
                    value={form.firstname}
                    onChange={handleChange}
                    error={validationErrors.firstname}
                />

                {/* Last name */}
                <InputField
                    name="lastname"
                    label="Last Name"
                    placeholder="Enter lastname..."
                    value={form.lastname}
                    onChange={handleChange}
                    error={validationErrors.lastname}
                />

                {/* Email */}
                <InputField
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter email..."
                    value={form.email}
                    onChange={handleChange}
                    error={validationErrors.email}
                />

                {/* Date of birth */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oly-red focus:border-transparent transition-all text-gray-700 [color-scheme:light]"
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Gender
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {GENDER_OPTIONS.map(option => (
                            <label key={option.value} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="genderType"
                                    value={option.value}
                                    checked={form.genderType === option.value}
                                    onChange={() => handleGenderChange(option.value)}
                                    className="h-4 w-4 text-oly-red focus:ring-oly-red border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                    {validationErrors.genderType && (
                        <p className="text-red-500 text-xs mt-2">{validationErrors.genderType}</p>
                    )}
                </div>

                {/* Favorite player */}
                <InputField
                    name="favoritePlayer"
                    label="Favorite Player (Optional)"
                    placeholder="Enter favorite player..."
                    value={form.favoritePlayer}
                    onChange={handleChange}
                />

                {/* Server error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-600 text-sm text-center font-medium">{error}</p>
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-oly-red hover:bg-oly-red-dark text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating Account...
                        </span>
                    ) : (
                        "Sign Up"
                    )}
                </button>

                <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm mb-2">
                        Already have an account?{" "}
                    </p>
                    <a
                        href="/api/login"
                        className="inline-block px-4 py-2 text-sm font-semibold text-oly-red border border-oly-red rounded-lg hover:bg-oly-red hover:text-white transition-all active:scale-95"
                    >
                        Sign in
                    </a>
                </div>
            </form>

            <div className="mt-6 text-center border-t border-gray-100 pt-4">
                <p className="text-gray-400 text-xs tracking-wide">
                    Unofficial Olympiacos FC App © 2025
                </p>
            </div>
        </div>
    );
};

export default RegisterCard;