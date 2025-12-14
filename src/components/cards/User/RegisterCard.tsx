import React, {useEffect, useState} from "react";
import type {RegisterCardProps, RegisterFieldsProps} from "../../../types/types.ts";
import {registerSchema} from "../../../schemas/register.ts";
import {z} from "zod";
import {API_URL} from "../../../config/api.ts";

interface SupportedPlayer {
    id: string;
    name: string;
    shirtNumber: number;
}
const GENDER_OPTIONS = [
    { value: "PREFER_NOT_TO_DISCLOSE", label: "Prefer not to disclose" },
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" }
];

const requiredFields = Object.entries(registerSchema.shape)
    .filter(([, schema]) => !(schema instanceof z.ZodOptional))
    .map(([key]) => key);

type FormState = Omit<RegisterFieldsProps, "dateOfBirth" | "favoriteLegend"> & {
    dateOfBirth: string;
    retypePassword: string;
    supportedPlayerId: string;
    supportedPlayerName: string;
    favoriteLegend: string;
};

interface InputFieldProps {
    name: keyof FormState;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: "text" | "password" | "email";
    error?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   name, label, value, onChange, placeholder = "", type = "text", error, required
                                               }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-oly-red focus:border-transparent transition-all ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const RegisterCard: React.FC<RegisterCardProps> = ({ onRegister, loading, error }) => {
    const [form, setForm] = useState<FormState>({
        username: "",
        password: "",
        retypePassword: "",
        firstname: "",
        lastname: "",
        email: "",
        dateOfBirth: "",
        supportedPlayerId: "",
        supportedPlayerName: "",
        favoriteLegend: "",
        genderType: "PREFER_NOT_TO_DISCLOSE",
        olympiacosFan: true
    });

    const fetchPlayerList = async (): Promise<SupportedPlayer[]> => {
        const response = await fetch(`${API_URL}/auth/register`);
        if (!response.ok) throw new Error("Failed to load Player list");
        return await response.json();
    }

    const [players, setPlayers] = useState<SupportedPlayer[]>([]);

    useEffect(() => {
        fetchPlayerList()
            .then(data => setPlayers(data))
            .catch(err => console.error(err))
    }, []);

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

        if (form.password !== form.retypePassword) {
            setValidationErrors({ retypePassword: "Passwords do not match" });
            return;
        }

        const dataForValidation: RegisterFieldsProps = {
            ...form,
            dateOfBirth: form.dateOfBirth || undefined,
            favoriteLegend: form.favoriteLegend || undefined,
            olympiacosFan: form.olympiacosFan ?? true
        };

        const result = registerSchema.safeParse(dataForValidation);

        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.issues.forEach(err => {
                const field = err.path?.[0];
                if (field && typeof field === "string") errors[field] = err.message;
            });
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});
        onRegister(result.data);
    };

    return (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl m-6 p-5 border border-gray-200 mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-oly-red-dark">Join the Legend</h1>
                <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">Create your account to track Olympiacos FC like never before.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField name="username" label="Username" placeholder="Enter username..." value={form.username} onChange={handleChange} error={validationErrors.username} required={requiredFields.includes("username")} />
                <InputField name="firstname" label="First Name" placeholder="Enter first name..." value={form.firstname} onChange={handleChange} error={validationErrors.firstname} required={requiredFields.includes("firstname")} />
                <InputField name="lastname" label="Last Name" placeholder="Enter last name..." value={form.lastname} onChange={handleChange} error={validationErrors.lastname} required={requiredFields.includes("lastname")} />
                <InputField name="email" type="email" label="Email" placeholder="Enter email..." value={form.email} onChange={handleChange} error={validationErrors.email} required={requiredFields.includes("email")} />
                <InputField name="password" type="password" label="Password" placeholder="Enter password..." value={form.password} onChange={handleChange} error={validationErrors.password} required={requiredFields.includes("password")} />
                <InputField name="retypePassword" type="password" label="Retype Password" placeholder="Retype password..." value={form.retypePassword} onChange={handleChange} error={validationErrors.retypePassword} required />
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth (Optional)</label>
                    <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} max={new Date().toISOString().split("T")[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oly-red focus:border-transparent" />
                </div>
                <InputField name="favoriteLegend" label="Favorite Legend (Optional)" placeholder="Enter favorite legend..." value={form.favoriteLegend} onChange={handleChange} />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender {requiredFields.includes("genderType") && <span className="text-red-500 ml-1">*</span>}</label>
                    <div className="grid grid-cols-2 gap-2">
                        {GENDER_OPTIONS.map(option => (
                            <label key={option.value} className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all">
                                <input type="radio" name="genderType" value={option.value} checked={form.genderType === option.value} onChange={() => handleGenderChange(option.value)} className="h-4 w-4 text-oly-red focus:ring-oly-red border-gray-300" />
                                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Favorite Team {requiredFields.includes("olympiacosFan") && <span className="text-red-500 ml-1">*</span>}</label>
                    <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all">
                            <input type="radio" name="olympiacosFan" value="true" checked={form.olympiacosFan} onChange={() => setForm(prev => ({ ...prev, olympiacosFan: true }))} className="h-4 w-4 text-oly-red focus:ring-oly-red border-gray-300" />
                            <span className="ml-2 text-sm text-gray-700">Olympiacos</span>
                        </label>
                        <label className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all">
                            <input type="radio" name="olympiacosFan" value="false" checked={!form.olympiacosFan} onChange={() => setForm(prev => ({ ...prev, olympiacosFan: false }))} className="h-4 w-4 text-oly-red focus:ring-oly-red border-gray-300" />
                            <span className="ml-2 text-sm text-gray-700">Other</span>
                        </label>
                    </div>
                </div>

                {/* Supported Player */}
                <div className="sm:col-span-2 mb-4 flex flex-col items-center p-4 border border-gray-200 rounded-xl shadow-sm bg-red-50">
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Supported Player</label>
                    <select
                        name="supportedPlayerId"
                        value={form.supportedPlayerId}
                        onChange={(e) => {
                            const id = e.target.value;
                            const selected = players.find(p => p.id === id);

                            setForm(prev => ({
                                ...prev,
                                supportedPlayerId: id,
                                supportedPlayerName: selected ? selected.name : ""
                            }));

                            if (validationErrors.supportedPlayerId) {
                                setValidationErrors(prev => ({ ...prev, supportedPlayerId: "" }));
                            }
                        }}
                        className={`border rounded-md p-3 w-full text-center ${validationErrors.supportedPlayerId ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-oly-red focus:border-oly-red`}
                    >
                        <option value="">Select Supported Player</option>
                        {players.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name} | {p.shirtNumber}
                            </option>
                        ))}
                    </select>

                    {validationErrors.supportedPlayerId && (
                        <p className="text-red-500 text-xs mt-2 text-center">{validationErrors.supportedPlayerId}</p>
                    )}
                </div>


                {/* Server error */}
                {error && <div className="sm:col-span-2 bg-red-50 border border-red-200 rounded-lg p-3"><p className="text-red-600 text-sm text-center font-medium">{error}</p></div>}

                {/* Submit */}
                <button type="submit" className="sm:col-span-2 w-full bg-oly-red hover:bg-oly-red-dark hover:cursor-pointer text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]" disabled={loading}>
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating Account...
                        </span>
                    ) : "Sign Up"}
                </button>

                <div className="sm:col-span-2 text-center mt-6">
                    <p className="text-gray-600 text-sm mb-2">Already have an account?</p>
                    <a href="/login" className="inline-block px-4 py-2 text-sm font-semibold text-oly-red border border-oly-red rounded-lg hover:bg-oly-red hover:text-white transition-all active:scale-95">
                        Sign in
                    </a>
                </div>
            </form>

            <div className="mt-6 text-center border-t border-gray-100 pt-4">
                <p className="text-gray-400 text-xs tracking-wide">Unofficial Olympiacos FC App © 2025</p>
            </div>
        </div>
    );
};

export default RegisterCard;