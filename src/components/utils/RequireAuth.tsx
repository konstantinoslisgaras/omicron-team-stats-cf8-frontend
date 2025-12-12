import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const auth = useContext(AuthContext)!;

    if (auth.loading) return null; // wait until context finishes hydrating

    if (!auth.isAuthenticated) return <Navigate to="/login" replace />;

    return <>{children}</>;
};

export default RequireAuth;