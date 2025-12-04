import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext} from "../context/AuthContext.ts";

export function LogoutButton() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    if (!auth) return null; // safety check

    const handleLogout = () => {
        auth.logoutUser();
        navigate("/api/login"); // redirect to login page
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-1 rounded hover:bg-gray-200 text-white hover:text-oly-red-dark transition"
        >
            Logout
        </button>
    );
}