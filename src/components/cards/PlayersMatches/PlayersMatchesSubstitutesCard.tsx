import type { PlayerMatchesPitchCardProps } from "../../../types/types.ts";

interface SubstitutesRowProps {
    substitutes: PlayerMatchesPitchCardProps["matchData"]["playerMatches"];
}

const PlayersMatchesSubstitutesCard = ({ substitutes }: SubstitutesRowProps) => {
    if (!substitutes || substitutes.length === 0) return null;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 overflow-x-auto mb-20">
            <h2 className="text-base font-semibold text-center uppercase tracking-wide mb-4 pb-2 border-b border-gray-200 text-[color:var(--color-oly-red)]">
                Substitutes
            </h2>

            <div className="flex justify-center gap-1 min-w-max px-2">
                {substitutes.map((p) => {
                    const stats: string[] = [];

                    if (p.minutesPlayed > 0) {
                        stats.push(`⏱️ ${p.minutesPlayed}'`);
                    }
                    if (p.goals > 0) {
                        stats.push(`⚽${p.goals > 1 ? `×${p.goals}` : ''}`);
                    }
                    if (p.assists > 0) {
                        stats.push(`👟${p.assists > 1 ? `×${p.assists}` : ''}`);
                    }
                    if (p.yellowCards > 0) {
                        stats.push(`🟨${p.yellowCards > 1 ? `×${p.yellowCards}` : ''}`);
                    }
                    if (p.redCards > 0) {
                        stats.push(`🟥`);
                    }

                    return (
                        <div
                            key={p.id}
                            className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-lg shadow-xs py-2 px-3 min-w-[85px] hover:shadow-md transition-all"
                        >
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center
                                           text-xs font-bold mb-1 shadow-sm
                                           bg-[color:var(--color-oly-red)] text-white"
                            >
                                {p.shirtNumber}
                            </div>

                            {/* Name */}
                            <p className="text-[13px] font-semibold text-gray-900 leading-tight text-center">
                                {p.player}
                            </p>

                            {/* Stats */}
                            {stats.length > 0 && (
                                <p className="text-[11px] mt-[2px] text-center">
                                    {/* minutes bolder & darker */}
                                    <span className="font-semibold text-gray-700">
                                        {stats[0]}
                                    </span>

                                    {stats.slice(1).length > 0 && (
                                        <span className="text-gray-500">
                                            {' ' + stats.slice(1).join(' ')}
                                        </span>
                                    )}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayersMatchesSubstitutesCard;