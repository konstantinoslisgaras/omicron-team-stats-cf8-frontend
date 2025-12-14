import { User, Mail, Calendar, UserCog, Trophy, ShieldX, Star, Heart, CheckCircle, XCircle } from "lucide-react";
import type { UserCardProps } from "../../../types/types.ts";

const UserCard = ({
                      id, firstname, lastname, email, dateOfBirth, genderType, favoriteLegend, supportedPlayerName,
                      role, active, olympiacosFan, memberSince }: UserCardProps) => {
    const age = dateOfBirth
        ? new Date().getFullYear() - new Date(dateOfBirth).getFullYear()
        : null;

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    const formatGender = (gender: string) =>
        gender
            ? gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()
            : "";

    const formatMemberSince = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-5">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

                {/* Header */}
                <div className="relative bg-gradient-to-r from-oly-red-dark to-oly-red text-white py-10 px-8 text-center">
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center mb-4 backdrop-blur-sm">
                            <User className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold">{firstname} {lastname}</h1>
                        <div className="mt-4 flex gap-3">
                            <span className="px-5 py-1 rounded-full bg-yellow-500 text-white text-sm font-semibold shadow-sm">
                                {role === "SUPER_ADMIN" ? "Admin" : "User"}
                            </span>
                            <span
                                className={`px-4 py-1 rounded-full text-sm font-semibold shadow-sm ${
                                    active ? "bg-green-500 text-white" : "bg-red-600 text-white"
                                }`}
                            >
                                {active ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Personal Info */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-oly-red/10 rounded-xl">
                                <UserCog className="w-5 h-5 text-oly-red-dark" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Personal Info</h2>
                        </div>
                        <div className="space-y-5">

                            {/* ID */}
                            {id && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-xl">
                                        <User className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">User ID</p>
                                        <p className="font-medium text-gray-800">{id}</p>
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-xl">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium text-gray-800">{email}</p>
                                </div>
                            </div>

                            {/* DOB */}
                            {dateOfBirth && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-50 rounded-xl">
                                        <Calendar className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Date of Birth</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-800">{formatDate(dateOfBirth)}</p>
                                            {age && (
                                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                    {age} yrs
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Gender */}
                            {genderType && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 rounded-xl">
                                        <ShieldX className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Gender</p>
                                        <p className="font-medium text-gray-800">{formatGender(genderType)}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Fan Info */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-amber-500/10 rounded-xl">
                                <Trophy className="w-5 h-5 text-amber-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Fan Info</h2>
                        </div>

                        <div className="space-y-5">
                            {/* Supported Player */}
                            {supportedPlayerName && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-xl">
                                        <Star className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Supported Player</p>
                                        <p className="font-medium text-gray-800">{supportedPlayerName}</p>
                                    </div>
                                </div>
                            )}

                            {/* Favorite Legend */}
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500/10 rounded-xl">
                                    <Star className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Favorite Legend</p>
                                    <p className="font-medium text-gray-800">
                                        {favoriteLegend || "-"}
                                    </p>
                                </div>
                            </div>

                            {/* Olympiacos Fan */}
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-50 rounded-xl">
                                    {olympiacosFan ? (
                                        <CheckCircle className="w-4 h-4 text-red-600" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Olympiacos Fan</p>
                                    <p className="font-medium text-gray-800">{olympiacosFan ? "Yes" : "No"}</p>
                                </div>
                            </div>

                            {/* Member Since */}
                            {memberSince && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-50 rounded-xl">
                                        <Heart className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Member Since</p>
                                        <p className="font-medium text-gray-800">{formatMemberSince(memberSince)}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;