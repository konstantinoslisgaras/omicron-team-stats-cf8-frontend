import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import type { CompetitionProps } from "../../../types/types.ts";
import axiosClient from "../../../api/axiosClient.ts";

const SuperAdminPage = () => {
    const [competitions, setCompetitions] = useState<CompetitionProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [successId, setSuccessId] = useState<string | null>(null);

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

    const handleChange = (id: string, value: number) => {
        setCompetitions(prev =>
            prev.map(c => (c.id === id ? { ...c, competitionPosition: value } : c))
        );
    };

    const handleSubmit = async (competitionId: string, position: number) => {
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
            setTimeout(() => setSuccessId(null), 3000); // hide success after 3s
        }
    };

    if (loading) return <p className="text-center mt-6">Loading competitions...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-6 p-2">
            <h1 className="text-2xl font-bold text-center mb-6 text-oly-red-dark">Super Admin Dashboard</h1>

            <h2 className="text-xl font-medium text-center mb-2" >Competitions</h2>
            <div className="space-y-3">
                {competitions.map(comp => (
                    <div
                        key={comp.id}
                        className="bg-white shadow rounded-lg p-3 flex items-center justify-between"
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
                                onClick={() => handleSubmit(comp.id, comp.competitionPosition ?? 1)}
                                className={`w-24 px-2 py-1 rounded bg-oly-red-dark text-white text-sm font-semibold hover:bg-oly-red transition-all flex justify-center items-center ${
                                    updatingId === comp.id ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                disabled={updatingId === comp.id}
                            >
                                {updatingId === comp.id ? "Updating..." : "Save"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuperAdminPage;