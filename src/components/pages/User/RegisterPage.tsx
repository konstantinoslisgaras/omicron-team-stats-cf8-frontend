import React, { useState } from "react";
import RegisterCard from "../../RegisterCard";
import { useNavigate } from "react-router";
import { registerUser } from "../../../services/api.register";
import type { RegisterFieldsProps } from "../../../types/types";

const RegisterPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (data: RegisterFieldsProps) => {
        setLoading(true);
        setError("");

        try {
            await registerUser(data);
            navigate("/api/login");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to register";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-xl">
                <RegisterCard onRegister={handleRegister} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default RegisterPage;