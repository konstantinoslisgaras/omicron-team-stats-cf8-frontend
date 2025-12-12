export type HomePageProps = {
    previousMatch?: MatchBasicProps;
    nextMatch?: MatchBasicProps;
    statLeaders?: StatLeadersInfoProps;
    competitionsStatus?: CompetitionProps[];
    top5Scorers?: PlayerStat[];
    top5Assists?: PlayerStat[];
    top5MostWins?: PlayerStat[];
    top5MinutesPlayedLeaders?: PlayerStat[];
    top5MatchesPlayedLeaders?: PlayerStat[];
    top5MostYellowCards?: PlayerStat[];
    top5MostRedCards?: PlayerStat[];
    top10Fans?: TopFanPlayer[];
    currentStreak?: Record<"WIN" | "LOSS" | "DRAW", number>;
};

export type PlayerProps =  {
    id: string;
    lastname: string;
    firstname: string;
    birthYear: number;
    nationality: string;
    shirtNumber: number;
    fans: number;
    genericPosition: string;
    position: string;
    preferredFoot: string;
    captain: boolean;
};

export type TopFanPlayer = {
    id: string;
    name: string;
    fans: number;
}

export type CoachProps =  {
    id: string;
    lastname: string;
    firstname: string;
    birthYear: number;
    nationality: string;
};

export type BiographyProps =  {
    id: string;
    fullname: string;
    birthdate: string;
    cityOfBirth: string;
    secondNationality: string;
    height: number;
    previousTeam: string
    biography: string;
}

export type TeamStatsProps =  {
    id: string;
    goals: number;
    assists: number;
    goalsConceded: number;
    yellowCards: number;
    redCards: number;
    wins: number;
    draws: number;
    losses: number;
    totalMatches: number;
    season: string;
}

export type PlayerStatsProps = {
    playerId: string;
    name: string;
    position: string;
    goals: number;
    assists: number;
    goalsAssists: number;
    yellowCards: number;
    redCards: number;
    goalsConceded: number;
    cleanSheets: number;
    minutesPlayed: number;
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
}

export type CoachStatsProps = {
    coachId: string;
    name: string;
    wins: number;
    draws: number;
    losses: number;
    goals: number;
    goalsConceded: number;
    matchesManaged: number;
}

export interface PlayerStat {
    playerId: string;
    name: string;
    position: string;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    wins: number;
    minutesPlayed: number;
    matchesPlayed: number;
}

export interface StatLeadersInfoProps {
    top5Scorers: PlayerStat[];
    top5Assists: PlayerStat[];
    top5MostWins: PlayerStat[];
    top5MinutesPlayedLeaders: PlayerStat[];
    top5MatchesPlayedLeaders: PlayerStat[];
    top5MostYellowCards: PlayerStat[];
    top5MostRedCards: PlayerStat[];
    topScorer?: PlayerStat;
    assistLeader?: PlayerStat;
    mostWins?: PlayerStat;
    minutesPlayedLeader?: PlayerStat;
    matchesPlayedLeader?: PlayerStat;
    mostYellowCards?: PlayerStat;
    mostRedCards?: PlayerStat;
}

export type MatchBasicProps = {
    id: string;
    olympiacosName: string;
    opponentName: string;
    olympiacosGoals: number;
    opponentGoals: number;
    date: string;
    time: string;
    ground: string;
    result: string;
    matchNumber: number;
};

export type MatchDetailedProps = MatchBasicProps & {
    day: string;
    competition: string;
    description: string;
    season: string;
};

export type HistoryProps = {
    id: string;
    name: string;
    trophies: string;
    history: string;
};

export type CompetitionProps = {
    id: string;
    competitionName: string;
    olympiacosTrophies: number;
    competitionPosition: number;
    competitionPoints: number;
    competitionInfo: string;
    participating: boolean;
}

export interface PlayerMatchesPitchCardProps {
    matchData: {
        id: string;
        olympiacosName: string;
        opponentName: string;
        olympiacosGoals: number;
        opponentGoals: number;
        description: string;
        playerMatches: {
            id: string;
            player: string;
            goals: number;
            assists: number;
            yellowCards: number;
            redCards: number;
            goalsConceded: number;
            minutesPlayed: number;
            shirtNumber: number;
            position: string;
        }[];
        teamStatsDTO: {
            id: string;
            goals: number;
            assists: number;
            goalsConceded: number;
            yellowCards: number;
            redCards: number;
            wins: number;
            draws: number;
            losses: number;
            totalMatches: number;
            season: string;
        };
        date: string;
        time: string;
        ground: string;
        result: string;
        matchNumber: number;
        day: string;
        competition: string;
        season: string;
        coachName: string;
    };
}

export type UserCardProps = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    dateOfBirth?: string;
    genderType?: string;
    favoriteLegend?: string;
    supportedPlayerName: string;
    role: string;
    active: boolean;
    olympiacosFan: boolean;
    memberSince: string;
}

export type UserDTO = {
    password: string;
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    dateOfBirth?: string;
    supportedPlayerId: string;
    supportedPlayerName: string;
    favoriteLegend?: string;
    genderType?: string;
    role: "USER" | "SUPER_ADMIN";
    active: boolean;
    olympiacosFan: boolean;
    memberSince: string;
}

export type Paginated<T> = {
    data: T[];
    currentPage: number;
    pageSize: number;
    totalPages: number;
    numberOfElements: number;
    totalElements: number;
};

export type RegisterFieldsProps = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    dateOfBirth?: string;
    supportedPlayerId: string;
    favoriteLegend?: string;
    genderType: string;
    olympiacosFan: boolean;
};

export type RegisterCardProps = {
    onRegister: (data: RegisterFieldsProps) => Promise<void>;
    loading: boolean;
    error?: string;
};