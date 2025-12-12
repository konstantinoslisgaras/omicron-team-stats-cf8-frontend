import React, { useState } from "react";
import RegisterCard from "../../cards/User/RegisterCard.tsx";
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
            navigate("/login");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to register";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-50 px-4 bg-gradient-to-br from-red-50 to-white"
            style={{
                background: "linear-gradient(120deg, #db4439 0%, #cf3a60 60%, #c30000 100%)"
            }}
        >
            <div className="w-full max-w-full">
                <RegisterCard onRegister={handleRegister} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default RegisterPage;