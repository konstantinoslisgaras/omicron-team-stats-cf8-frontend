import { type ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { LoginFields } from "../schemas/login";
import { login } from "../services/api.login";
import type { UserDTO } from "../types/types.ts";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const storedUser = localStorage.getItem("user");

        if (token) setAccessToken(token);
        if (storedUser) setUser(JSON.parse(storedUser));

        setLoading(false);
    }, []);

    const loginUser = async (fields: LoginFields) => {
        const res = await login(fields);

        const token = res.token;
        setAccessToken(token);
        localStorage.setItem("access_token", token);

        const me: UserDTO = await fetch("http://localhost:8080/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }).then(r => r.json());

        setUser(me);
        localStorage.setItem("user", JSON.stringify(me));
    };

    const logoutUser = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        setAccessToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
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