import type { CompetitionProps } from "../../../types/types.ts";
import {useNavigate} from "react-router";

type CompetitionsStatusProps = {
    competitions: CompetitionProps[] | undefined;
};

const CompetitionsStatusCard = ({ competitions }: CompetitionsStatusProps) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/competitions/`)
    }
    return (
        <div className="flex flex-col items-center">
            <span className="px-5 py-2 bg-blue-800 text-white font-semibold rounded-full mb-4 shadow text-sm uppercase tracking-wide">
                Competitions
            </span>

            <div
                className="w-full space-y-3 hover:cursor-pointer"
                onClick={handleClick}

            >
                {competitions?.length ? (
                    competitions.map((comp) => (
                        <div
                            key={comp.id}
                            className="flex justify-between items-center bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all rounded-2xl p-5"
                        >
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-gray-900 text-lg leading-tight">
                                        {comp.competitionName}
                                    </p>
                                    {comp.participating && (
                                        <span className="flex items-center gap-1 text-blue-700 text-xs font-semibold">
                                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                            Competing
                                        </span>
                                    )}
                                </div>
                                <div className="mt-2 text-sm text-gray-700 font-medium">
                                    <span className="flex items-center gap-1">
                                        <span className="text-gray-800">Position:</span>
                                        <span className="font-semibold text-oly-red-dark">
                                            {comp.competitionPosition}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-center">
                                <span className="text-2xl font-bold text-oly-red-dark leading-none">
                                    {comp.competitionPoints}
                                </span>
                                <span className="text-xs text-gray-500">points</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4">
                        Competition data loading...
                    </p>
                )}
            </div>
        </div>
    );
};

export default CompetitionsStatusCard;