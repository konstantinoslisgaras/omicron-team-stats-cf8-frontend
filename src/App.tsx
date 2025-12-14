import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToHash } from "./components/utils/ScrollToHash.tsx";
import Layout from "./components/layout/Layout";
import HomePage from "./components/pages/HomePage/HomePage.tsx";
import FullTeamPage from "./components/pages/Team/FullTeamPage.tsx";
import PlayerBiographyPage from "./components/pages/Players/PlayerBiographyPage.tsx";
import MatchesBasicPage from "./components/pages/Matches/MatchesBasicPage.tsx";
import MatchesDetailedPage from "./components/pages/Matches/MatchesDetailedPage.tsx";
import PlayersMatchesPage from "./components/pages/PlayersMatches/PlayersMatchesPage.tsx";
import HistoryPage from "./components/pages/History/HistoryPage.tsx";
import PlayerStatsPage from "./components/pages/Players/PlayerStatsPage.tsx";
import CoachBiographyPage from "./components/pages/Coach/CoachBiographyPage.tsx";
import CoachStatsPage from "./components/pages/Coach/CoachStatsPage.tsx";
import TeamStatsPage from "./components/pages/Team/TeamStatsPage.tsx";
import CompetitionPage from "./components/pages/Competitions/CompetitionsPage.tsx";
import LoginPage from "./components/pages/User/LoginPage.tsx";
import RegisterPage from "./components/pages/User/RegisterPage.tsx";
import UserPage from "./components/pages/User/UserPage.tsx";
import SuperAdminPage from "./components/pages/SuperAdmin/SuperAdminPage.tsx";
import RequireAuth from "./components/utils/RequireAuth.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import NotFoundPage from "./components/pages/ErrorPages/NotFoundPage.tsx";
import ForbiddenPage from "./components/pages/ErrorPages/ForbiddenPage.tsx";
import EditProfilePage from "./components/pages/User/EditProfilePage.tsx";

const ProtectedLayout = () => (
    <RequireAuth>
        <Layout />
    </RequireAuth>
);

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ScrollToHash />
                <Routes>

                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedLayout />}>
                        <Route index element={<HomePage />} /> {/* "/" */}
                        <Route path="homepage" element={<HomePage />} />

                        {/* Players */}
                        <Route path="players">
                            <Route path="fullteam" element={<FullTeamPage />} />
                            <Route path=":playerId/:detailedBioId" element={<PlayerBiographyPage />} />
                        </Route>

                        {/* Coach */}
                        <Route path="coach/:coachId/:detailedBioId" element={<CoachBiographyPage />} />

                        {/* Matches */}
                        <Route path="matches">
                            <Route path="schedule" element={<MatchesBasicPage />} />
                            <Route path="detailed" element={<MatchesDetailedPage />} />
                            <Route path="detailed/:matchId" element={<PlayersMatchesPage />} />
                        </Route>

                        {/* Statistics */}
                        <Route path="statistics">
                            <Route path="team/:teamStatsId" element={<TeamStatsPage />} />
                            <Route path="players/:playerId" element={<PlayerStatsPage />} />
                            <Route path="coach/:coachStatsId" element={<CoachStatsPage />} />
                        </Route>

                        {/* Competitions */}
                        <Route path="competitions" element={<CompetitionPage />} />

                        {/* History */}
                        <Route path="history" element={<HistoryPage />} />

                        {/* User */}
                        <Route path="profile" element={<UserPage />} />
                        <Route path="profile/edit" element={<EditProfilePage />} />

                        {/* Admin */}
                        <Route path="super-admin" element={<SuperAdminPage />} />
                        <Route path="user/:username" element={<UserPage />} />

                        {/* Errors */}
                        <Route path="/403" element={<ForbiddenPage />} />
                        <Route path="*" element={<NotFoundPage />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;