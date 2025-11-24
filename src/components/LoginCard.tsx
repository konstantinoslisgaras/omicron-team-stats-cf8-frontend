import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import type { LoginCardProps } from "../types/types.ts";

const LoginCard: React.FC<LoginCardProps> = ({ onLogin, loading = false, error }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <Card
            className="w-80 text-center bg-white/85 shadow-md hover:shadow-xl transition-all duration-200
      rounded-2xl border border-gray-200 flex flex-col justify-between"
        >
            <CardHeader
                className="bg-oly-red-dark text-white rounded-t-2xl py-3 text-center flex flex-col items-center gap-1"
            >
                <span className="font-bold text-xl">Login</span>
                <span className="text-sm text-gray-200">Welcome back</span>
            </CardHeader>

            <CardContent className="text-center py-4 space-y-3">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="email"
                        required
                        className="border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-oly-red-dark/40"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        required
                        className="border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-oly-red-dark/40"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <p className="text-red-600 font-semibold text-sm">{error}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-oly-red-dark text-white rounded-lg hover:shadow-lg hover:shadow-oly-red-dark/40 transition-all"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginCard;
