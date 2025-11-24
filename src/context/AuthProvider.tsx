import {type ReactNode, useEffect, useState} from "react";
import { getCookie, setCookie, deleteCookie} from "../components/utils/cookies.ts";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext.ts";
import type { LoginFields} from "../schemas/login.ts";

type JwtPayload = {
    email?: string;
    tenant_id?: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [tenantId, setTenantId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = getCookie("access_token");
        setAccessToken(token ?? null);
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                console.log(decoded);
                setTenantId(decoded.tenant_id ?? null);
            } catch {
                setTenantId(null);
            }
        } else {
            setTenantId(null);
        }
        setLoading(false);
    }, []);
}