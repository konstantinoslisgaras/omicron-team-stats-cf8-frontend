import React, { useState } from "react";
import { loginSchema } from "../../../schemas/login.ts";

type LoginCardProps = {
    onLogin: (values: { username: string; password: string }) => void;
    loading?: boolean;
    error?: string;
};

const LoginCard: React.FC<LoginCardProps> = ({ onLogin, loading = false, error }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = loginSchema.safeParse(formData);
        if (!result.success) return;
        onLogin(formData);
    };

    const handleChange = (field: keyof typeof formData) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => ({ ...prev, [field]: e.target.value }));
        };

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all p-6 md:p-8 mx-auto">

            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
                <h1 className="text-2xl font-bold text-oly-red-dark">Welcome Back, Legend</h1>
                <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">Track every goal, every victory, every moment of glory.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-oly-red focus:border-transparent text-sm md:text-base transition-all"
                    value={formData.username}
                    onChange={handleChange("username")}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-oly-red focus:border-transparent text-sm md:text-base transition-all"
                    value={formData.password}
                    onChange={handleChange("password")}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-oly-red hover:bg-oly-red-dark active:scale-95 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base hover:cursor-pointer"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Signing in...
                        </span>
                    ) : (
                        "Sign In"
                    )}
                </button>

                {/* Error Message */}
                <div className="min-h-[1.5rem]">
                    {error && (
                        <p className="text-oly-red text-xs md:text-sm text-center mt-2">{error}</p>
                    )}
                </div>

                <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm mb-2">
                        New to the platform?
                    </p>
                    <a
                        href="/register"
                        className="inline-block px-4 py-2 text-sm font-semibold text-oly-red border border-oly-red rounded-lg hover:bg-oly-red hover:text-white transition-all active:scale-95"
                    >
                        Create an account
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

export default LoginCard;