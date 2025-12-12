import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext} from "../../../context/AuthContext.ts";

export function LogoutButton() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    if (!auth) return null; // safety check

    const handleLogout = () => {
        auth.logoutUser();
        navigate("/login"); // redirect to login page
    };

    return (
        <button
            onClick={handleLogout}
            className="text-white font-medium text-sm px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 hover:cursor-pointer transition whitespace-nowrap"
        >
            Logout
        </button>
    );
}