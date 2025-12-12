import { createContext } from "react";
import type { LoginFields } from "../schemas/login.ts";

export type AuthUser = {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    dateOfBirth?: string;
    genderType?: string;
    favoriteLegend?: string;
    supportedPlayerId: string;
    supportedPlayerName: string;
    role: "USER" | "SUPER_ADMIN";
    active: boolean;
    olympiacosFan: boolean;
};

type AuthContextProps = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    accessToken: string | null;
    loginUser: (fields: LoginFields) => Promise<void>;
    logoutUser: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)