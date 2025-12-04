import { type ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { LoginFields } from "../schemas/login";
import { login } from "../services/api.login";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token"); // ✅ read from localStorage
        setAccessToken(token ?? null);
        setLoading(false);
    }, []);

    const loginUser = async (fields: LoginFields) => {
        const res = await login(fields);
        const token = res.token;

        localStorage.setItem("access_token", token); // ✅ store JWT in localStorage
        setAccessToken(token);
    };

    const logoutUser = () => {
        localStorage.removeItem("access_token");
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!accessToken,
                accessToken,
                loginUser,
                logoutUser,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}