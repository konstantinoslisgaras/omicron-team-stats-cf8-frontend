import React, { useContext, useEffect, useState } from "react";
import UserCard from "../../UserCard.tsx";
import { AuthContext } from "../../../context/AuthContext.ts";
import type { UserDTO } from "../../../types/types.ts";
import { useParams } from "react-router";
import axiosClient from "../../../api/axiosClient.ts";

const UserPage: React.FC = () => {
    const { username } = useParams();
    const auth = useContext(AuthContext);

    const [user, setUser] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!auth?.accessToken) {
            setError("You need to log in.");
            setLoading(false);
            return;
        }

        const endpoint = username
            ? `http://localhost:8080/api/users/profile/${username}`
            : `http://localhost:8080/api/users/me`;

        const fetchUser = async () => {
            try {
                const { data } = await axiosClient.get<UserDTO>(endpoint, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                        Accept: "application/json",
                    },
                });

                setUser(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [auth?.accessToken, username]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p>No user data available</p>;

    return (
        <div className="p-6">
            <UserCard
                firstname={user.firstname}
                lastname={user.lastname}
                email={user.email}
                dateOfBirth={user.dateOfBirth}
                favoritePlayer={user.favoritePlayer}
                genderType={user.genderType}
            />
        </div>
    );
};

export default UserPage;