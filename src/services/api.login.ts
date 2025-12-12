import type {LoginFields} from "../schemas/login.ts";
import {API_URL} from "../config/api.ts";

export type LoginResponse = {
    firstname: string;
    lastname: string;
    token: string;
}

export async function login({ username, password }: LoginFields): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/auth/authenticate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        let detail = "Login failed. Wrong username or password";
        try {
            const data = await res.json();
            if (typeof data?.detail === "string") detail = data.detail;
        } catch (error) {
            console.log(error);
        }
        throw new Error(detail);
    }
    return await res.json();
}