interface CurrentStreakCardProps {
    currentStreak: Record<"WIN" | "LOSS" | "DRAW", number>;
}

const CurrentStreak = ({ currentStreak } : CurrentStreakCardProps ) => {
    const streakType = Object.keys(currentStreak)[0] as "WIN" | "LOSS" | "DRAW";
    const streakCount = currentStreak[streakType];

    const bgColor =
        streakType === "WIN" ? "bg-green-600" :
            streakType === "LOSS" ? "bg-red-600" :
                "bg-yellow-600";

    return (
        <div className={`mt-2 px-3 py-2.5 rounded-lg text-white font-bold shadow text-center ${bgColor} text-sm`}>
            <span className="text-[10px] font-semibold tracking-wide text-red-100">CURRENT STREAK&nbsp;&nbsp;</span>
            {streakType} : {streakCount}
        </div>
    );
};

export default CurrentStreak;