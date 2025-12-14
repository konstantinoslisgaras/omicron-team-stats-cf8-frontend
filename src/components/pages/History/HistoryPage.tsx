import { useEffect, useState } from "react";
import type { HistoryProps } from "../../../types/types.ts";
import HistoryCard from "../../cards/History/HistoryCard.tsx";
import axiosClient from "../../../api/axiosClient.ts";

const HistoryPage = () => {
    const [info, setInfo] = useState<HistoryProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get("/history");
                setInfo(data);
            } catch (error) {
                console.error("Failed to load Olympiacos info: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    if (loading) return <p>Loading...</p>;
    if (!info) return <p>Failed to load history...</p>;

    return (
        <HistoryCard olympiacosHistory={info} />
    )
}

export default HistoryPage;