import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ServerCrash } from "lucide-react";

const puns = [
    "Offside! This page has strayed well beyond the line. The flag's gone up and play's been stopped. Head back to where you came from.",
    "Absolute howler! This page has put the ball in its own net. Sometimes these things happen. Let's get back to the menu and start fresh.",
    "Straight red card! The referee's had enough of this page and sent it off. No complaints, it had to go. Time to head back.",
    "Half-time whistle's gone! This page is in the dressing room having a break. Use the menu to find what you're looking for instead.",
    "VAR check complete. We've reviewed the footage from every angle and the decision is final - this page doesn't exist. No overturning this one.",
    "Even world-class strikers sky it over the bar from time to time. This one didn't come off. Let's go back and try a different route.",
    "The goalkeeper has come off his line and claimed it! This page has been caught and cleared. Let's Head back to safety.",
    "The linesman's flag is up! This page was miles offside. We're going back to try attacking again from a proper position."
];

const NotFound = () => {
    // Pick a random pun once per render
    const pun = useMemo(() => puns[Math.floor(Math.random() * puns.length)], []);

    return (
        <div className="flex flex-col items-center pt-16 px-4">
            <ServerCrash className="w-12 h-12 mb-4 text-oly-red" />
            <h1 className="text-5xl font-bold text-oly-red-dark mb-2">404</h1>
            <p className="text-lg text-gray-800 m-10 text-center max-w-md">
                {pun}
            </p>
            <Link
                to="/"
                className="px-6 py-2 bg-oly-red text-white font-semibold rounded-md hover:bg-oly-red-dark transition-all m-4"
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFound;