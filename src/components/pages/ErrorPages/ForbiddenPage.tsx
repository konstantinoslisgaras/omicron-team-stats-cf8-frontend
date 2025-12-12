import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForbiddenPage() {
    return (
        <div className="flex flex-col items-center pt-16 px-4">
            <ShieldAlert className="w-12 h-12 mb-4 text-oly-red" />

            <h1 className="text-5xl font-bold text-oly-red-dark mb-2">
                403
            </h1>

            <p className="text-lg text-gray-800 m-10 text-center max-w-md">
                You do not have permission to access this page.
                If you believe this is an error, please contact support or return home.
            </p>

            <Link
                to="/"
                className="px-6 py-2 bg-oly-red text-white font-semibold rounded-md hover:bg-oly-red-dark transition-all m-4"
            >
                Go to Homepage
            </Link>
        </div>
    );
}
