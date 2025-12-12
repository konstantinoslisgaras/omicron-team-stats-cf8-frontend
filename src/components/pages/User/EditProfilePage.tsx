import React, { useEffect, useState, useContext, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { API_URL } from "../../../config/api";
import { type UpdateProfileFields, updateProfileSchema } from "../../../schemas/updateProfile.ts";
import type { UserDTO } from "../../../types/types";

// Player type returned from API
interface SupportedPlayer {
    id: string;
    name: string;
    shirtNumber: number;
}

const EditProfilePage: React.FC = () => {
    const auth = useContext(AuthContext)!;
    const navigate = useNavigate();

    const [form, setForm] = useState<UpdateProfileFields & { password?: string }>({
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        favoriteLegend: "",
        supportedPlayerId: "",
        password: ""
    });

    const [players, setPlayers] = useState<SupportedPlayer[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof UpdateProfileFields | "password", string>>>({});
    const [serverError, setServerError] = useState<string>("");

    // Fetch profile and player list
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/profile`, {
                    headers: { Authorization: `Bearer ${auth.accessToken}` }
                });
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data: UserDTO = await res.json();

                setForm({
                    firstname: data.firstname ?? "",
                    lastname: data.lastname ?? "",
                    dateOfBirth: data.dateOfBirth ?? "",
                    favoriteLegend: data.favoriteLegend ?? "",
                    supportedPlayerId: data.supportedPlayerId ?? "",
                    password: ""
                });
            } catch (err: unknown) {
                setServerError(err instanceof Error ? err.message : String(err));
            }
        };

        const fetchPlayers = async () => {
            try {
                const res = await fetch(`${API_URL}/auth/register`);
                if (!res.ok) throw new Error("Failed to fetch players");
                const data: SupportedPlayer[] = await res.json();
                setPlayers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
        fetchPlayers();
    }, [auth.accessToken]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof form]) {
            setErrors(prev => ({ ...prev, [name as keyof typeof form]: "" }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setServerError("");

        // Exclude empty password from validation
        const dataToValidate = { ...form };
        if (!dataToValidate.password) delete dataToValidate.password;

        const result = updateProfileSchema.safeParse(dataToValidate);
        if (!result.success) {
            const validationErrors: Partial<Record<keyof UpdateProfileFields | "password", string>> = {};
            result.error.issues.forEach(issue => {
                const key = issue.path[0] as keyof UpdateProfileFields | "password";
                validationErrors[key] = issue.message;
            });
            setErrors(validationErrors);
            return;
        }

        setSaving(true);
        try {
            const payload: Partial<UpdateProfileFields & { password?: string }> = { ...form };
            if (!form.password) delete payload.password;

            const res = await fetch(`${API_URL}/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.accessToken}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorData: { description?: string } = await res.json();
                throw new Error(errorData.description ?? "Failed to update profile");
            }

            navigate("/profile/");
        } catch (err: unknown) {
            setServerError(err instanceof Error ? err.message : String(err));
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const fieldLabels: Record<keyof UpdateProfileFields, string> = {
        firstname: "First Name",
        lastname: "Last Name",
        dateOfBirth: "Date of Birth",
        favoriteLegend: "Favorite Legend",
        supportedPlayerId: "Supported Player"
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-10">
            <h1 className="text-2xl font-bold text-oly-red-dark mb-6 text-center">Edit Profile</h1>

            {serverError && <p className="text-red-500 mb-4 text-center">{serverError}</p>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                {(["firstname", "lastname", "dateOfBirth", "favoriteLegend"] as (keyof UpdateProfileFields)[]).map(field => (
                    <div key={field}>
                        <label className="block text-sm font-medium text-gray-700">{fieldLabels[field]}</label>
                        <input
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            type={field === "dateOfBirth" ? "date" : "text"}
                            className={`w-full p-2 border rounded ${errors[field] ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                    </div>
                ))}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Supported Player</label>
                    <select
                        name="supportedPlayerId"
                        value={form.supportedPlayerId}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.supportedPlayerId ? "border-red-500" : "border-gray-300"}`}
                    >
                        <option value="">Select Player</option>
                        {players.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name} | {p.shirtNumber}
                            </option>
                        ))}
                    </select>
                    {errors.supportedPlayerId && <p className="text-red-500 text-xs mt-1">{errors.supportedPlayerId}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">New Password (optional)</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password || ""}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-2 px-4 font-medium bg-oly-red text-white rounded-lg hover:cursor-pointer hover:bg-oly-red-dark transition-all"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default EditProfilePage;