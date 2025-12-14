import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react";
import type {CompetitionProps, Paginated, UserDTO} from "../../../types/types.ts";
import axiosClient from "../../../api/axiosClient.ts";

const SuperAdminPage = () => {
    const navigate = useNavigate();
    const [competitions, setCompetitions] = useState<CompetitionProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [successId, setSuccessId] = useState<string | null>(null);
    const [totalUsers, setTotalUsers] = useState<number | null>(null);

    const [searchUsername, setSearchUsername] = useState("");
    const [searchError, setSearchError] = useState("");

    const [paginatedUsers, setPaginatedUsers] = useState<Paginated<UserDTO> | null>(null);
    const [userPage, setUserPage] = useState(0);
    const [userPageSize] = useState(10);

    const fetchPaginatedUsers = async (page: number) => {
        try {
            const res = await axiosClient.get<Paginated<UserDTO>>(
                `/super-admin/users/paginated?page=${page}&size=${userPageSize}`
            );
            setPaginatedUsers(res.data);
            setUserPage(res.data.currentPage);
        } catch (err) {
            console.error("Error fetching paginated users:", err);
        }
    };

    useEffect(() => {
        fetchPaginatedUsers(0);
    }, []);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const res = await axiosClient.get("/super-admin/competitions");
                setCompetitions(res.data);
            } catch (err) {
                console.error("Error fetching competitions:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCompetitions();
    }, []);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const res = await axiosClient.get<number>("/super-admin/users/count");
                setTotalUsers(res.data);
            } catch (err) {
                console.error("Error fetching total users:", err);
            }
        };
        fetchTotalUsers();
    }, []);

    const handleChange = (id: string, value: number) => {
        setCompetitions(prev =>
            prev.map(c => (c.id === id ? { ...c, competitionPosition: value } : c))
        );
    };

    const handleSubmitPosition = async (competitionId: string, position: number) => {
        setUpdatingId(competitionId);
        setSuccessId(null);
        try {
            const res = await axiosClient.put("/super-admin/competitions/position", {
                competitionId,
                position,
            });
            setCompetitions(prev =>
                prev.map(c => (c.id === competitionId ? res.data : c))
            );
            setSuccessId(competitionId);
        } catch (err) {
            console.error("Error updating position:", err);
        } finally {
            setUpdatingId(null);
            setTimeout(() => setSuccessId(null), 3000);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearchError("");
        if (!searchUsername.trim()) return;

        try {
            const res = await axiosClient.get(`/super-admin/users/${searchUsername}`);
            const user = res.data;
            if (user && user.username) {
                navigate(`/user/${user.username}`);
            } else {
                setSearchError("User not found");
            }
        } catch (err) {
            setSearchError("User not found");
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-6">Loading competitions...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-6 p-2 mb-30">
            <h1 className="text-2xl font-bold text-center mb-6 text-oly-red-dark">Super Admin Dashboard</h1>

            {/* Search User */}
            <h2 className="text-xl font-medium text-center mt-10">Users (Total Users: {totalUsers})</h2>
            <div className="bg-white shadow rounded-lg p-4 my-2 max-w-md mx-auto">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter username..."
                        value={searchUsername}
                        onChange={e => setSearchUsername(e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-oly-red focus:ring-1 focus:ring-oly-red transition-all"
                    />
                    <button
                        type="submit"
                        className="bg-oly-red text-white px-4 py-2 rounded hover:bg-oly-red-dark transition-all font-medium hover:cursor-pointer"
                    >
                        Go to Profile
                    </button>
                </form>
                {searchError && <p className="text-red-500 text-sm mt-2 text-center">{searchError}</p>}
            </div>

            {/* User List */}
            {paginatedUsers && (
                <div className="mt-6">
                    <h2 className="text-xl font-medium text-center mb-2">User List</h2>
                    <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead>
                        <tr>
                            <th className="border px-2 py-1">ID</th>
                            <th className="border px-2 py-1">Username</th>
                            <th className="border px-2 py-1">Fullname</th>
                            <th className="border px-2 py-1">Email</th>
                            <th className="border px-2 py-1">Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedUsers.data.map(u => (
                            <tr key={u.id}>
                                <td className="border px-2 py-1">{u.id}</td>
                                <td className="border px-2 py-1">{u.username}</td>
                                <td className="border px-2 py-1">{`${u.firstname} ${u.lastname}`}</td>
                                <td className="border px-2 py-1">{u.email}</td>
                                <td className="border px-2 py-1">{u.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="flex gap-2 justify-center mt-4">
                        <button
                            disabled={userPage <= 0}
                            onClick={() => fetchPaginatedUsers(userPage - 1)}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:cursor-pointer"
                        >
                            Previous
                        </button>
                        <span className="px-2 py-1">
                            Page {userPage + 1} of {paginatedUsers.totalPages}
                        </span>
                        <button
                            disabled={userPage + 1 >= paginatedUsers.totalPages}
                            onClick={() => fetchPaginatedUsers(userPage + 1)}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Competitions List */}
            <h2 className="text-xl font-medium text-center mt-5 my-2">Competitions</h2>
            <div className="space-y-3">
                {competitions.map(comp => (
                    <div
                        key={comp.id}
                        className="bg-white shadow rounded-lg p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-oly-red-dark" />
                            <span className="font-medium text-gray-800">{comp.competitionName}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {successId === comp.id && (
                                <span className="text-green-500 text-sm font-bold ml-2">Position Updated!</span>
                            )}
                            <input
                                type="number"
                                min={0}
                                className="w-16 border border-gray-300 rounded px-1 py-1 text-center text-sm"
                                value={comp.competitionPosition ?? ""}
                                onChange={e => {
                                    const raw = e.target.value;
                                    const num = Number(raw);
                                    handleChange(comp.id, isNaN(num) ? 1 : num);
                                }}
                            />
                            <button
                                onClick={() => handleSubmitPosition(comp.id, comp.competitionPosition ?? 1)}
                                className={`w-32 px-2 py-1 rounded bg-oly-red-dark text-white text-sm font-semibold hover:bg-oly-red transition-all flex justify-center items-center hover:cursor-pointer ${
                                    updatingId === comp.id ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                disabled={updatingId === comp.id}
                            >
                                {updatingId === comp.id ? "Updating..." : "Update position"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuperAdminPage;