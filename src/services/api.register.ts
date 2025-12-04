import type { RegisterFieldsProps } from "../types/types.ts";
import axiosClient from "../api/axiosClient.ts";

export type RegisterResponse = {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    token?: string;
};

export async function registerUser(fields: RegisterFieldsProps): Promise<RegisterResponse> {
    const { data } = await axiosClient.post<RegisterResponse>("/auth/register", fields);

    if (data.token) {
        localStorage.setItem("access_token", data.token);
    }

    return data;
}