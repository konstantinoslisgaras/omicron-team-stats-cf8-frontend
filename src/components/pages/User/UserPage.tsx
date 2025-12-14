import React, { useContext, useEffect, useState } from "react";
import UserCard from "../../cards/User/UserCard.tsx";
import { AuthContext } from "../../../context/AuthContext.ts";
import type { UserDTO } from "../../../types/types.ts";
import { useNavigate, useParams } from "react-router";
import axiosClient from "../../../api/axiosClient.ts";
import { API_URL } from "../../../config/api.ts";

const UserPage: React.FC = () => {
    const { username } = useParams();
    const auth = useContext(AuthContext)!;
    const navigate = useNavigate();

    const [user, setUser] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!auth.accessToken) {
            setError("You need to log in.");
            setLoading(false);
            return;
        }

        const endpoint = username ? `${API_URL}/user/${username}` : `${API_URL}/profile`;

        const fetchUser = async () => {
            try {
                const { data } = await axiosClient.get<UserDTO>(endpoint, {
                    headers: { Authorization: `Bearer ${auth.accessToken}` },
                });
                setUser(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [auth.accessToken, username]);

    if (loading) return <p className="text-center text-gray-500 mt-10">Loading user...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    if (!user) return <p className="text-center text-gray-500 mt-10">No user data available</p>;

    return (
        <div className="max-w-4xl mb-20 mx-auto p-6 space-y-6">

            {/* Admin Dashboard button */}
            {auth.user?.role === "SUPER_ADMIN" && (
                <div className="flex justify-center">
                    <button
                        className="px-6 py-2.5 bg-oly-red-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-red-700 hover:cursor-pointer transition-all duration-200 active:scale-[0.98]"
                        onClick={() => navigate("/super-admin")}
                    >
                        Admin Dashboard
                    </button>
                </div>
            )}

            {/* User Card */}
            <UserCard
                id={user.id}
                firstname={user.firstname}
                lastname={user.lastname}
                email={user.email}
                dateOfBirth={user.dateOfBirth}
                favoriteLegend={user.favoriteLegend}
                supportedPlayerName={user.supportedPlayerName}
                genderType={user.genderType}
                role={user.role}
                active={user.active}
                olympiacosFan={user.olympiacosFan}
                memberSince={user.memberSince}
            />

            {/* User Edit button */}
            {auth.user?.username === user.username && (
                <div className="flex justify-center mb-10">
                    <button
                        onClick={() => navigate("/profile/edit")}
                        className="px-4 py-2 bg-oly-red text-white font-medium rounded-lg hover:bg-oly-red-dark hover:cursor-pointer transition-all duration-200 active:scale-[0.98]"
                    >
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserPage;