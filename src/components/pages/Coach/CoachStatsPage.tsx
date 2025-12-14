import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../../../config/api.ts";
import type { CoachStatsProps } from "../../../types/types.ts";
import CoachStatsCard from "../../cards/Coach/CoachStatsCard.tsx";
import axiosClient from "../../../api/axiosClient.ts";

const CoachStatsPage =() => {
    const { coachStatsId } = useParams<{ coachStatsId: string }>();
    const [coachStats, setCoachStats] = useState<CoachStatsProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axiosClient.get(`${API_URL}/statistics/coach/${coachStatsId}`);
                setCoachStats(data);
                document.title = `${data.name} Stats`;
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (coachStatsId) {
            fetchStats();
        }
    }, [coachStatsId]);

    if (loading) return <p className="text-center mt-10">Loading coach stats...</p>;
    if (!coachStats) return <p className="text-center mt-10 text-gray-600">No stats found.</p>;

    return(
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-center text-oly-red-dark mb-8">
                    Coach Statistics
                </h1>
                <div className="flex justify-center">
                    <CoachStatsCard stats={coachStats} />
                </div>
            </div>
        </>
    )
};

export default CoachStatsPage;