import {
    User,
    Mail,
    Calendar,
    UserCog,
    Trophy,
    Cake,
    Shield,
    Star
} from "lucide-react";
import type { UserCardProps } from "../types/types";

const UserCard = (user: UserCardProps) => {
    const { firstname, lastname, email, dateOfBirth, genderType, favoritePlayer } = user;

    const age = dateOfBirth ? new Date().getFullYear() - new Date(dateOfBirth).getFullYear() : null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatGender = (gender: string) => {
        return gender.replace(/_/g, ' ').toUpperCase();
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-20">
            <div className="bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-oly-red-dark to-oly-red text-white py-8 px-6 text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 rounded-full">
                            <User className="w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-wide">
                                {firstname} {lastname}
                            </h1>
                            <p className="text-lg opacity-90 mt-1">User Profile</p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information Card */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-oly-red/10 rounded-lg">
                                    <UserCog className="w-6 h-6 text-oly-red-dark" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                            </div>

                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="text-lg font-semibold text-gray-800 mt-1">{email}</p>
                                    </div>
                                </div>

                                {dateOfBirth && (
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-green-50 rounded-lg">
                                            <Calendar className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <p className="text-lg font-semibold text-gray-800">
                                                    {formatDate(dateOfBirth)}
                                                </p>
                                                {age !== null && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-oly-red/10 text-oly-red-dark text-sm font-medium">
                                                        <Cake className="w-4 h-4" />
                                                        {age} years
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {genderType && (
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-purple-50 rounded-lg">
                                            <Shield className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Gender</p>
                                            <p className="text-lg font-semibold text-gray-800 mt-1 capitalize">
                                                {formatGender(genderType)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Fan Information Card */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                    <Trophy className="w-6 h-6 text-amber-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Fan Information</h2>
                            </div>

                            <div className="space-y-5">
                                {favoritePlayer ? (
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-amber-500/10 rounded-lg">
                                            <Star className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Favorite Player</p>
                                            <p className="text-xl font-bold text-gray-800 mt-1">{favoritePlayer}</p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Supporting Olympiacos FC since {dateOfBirth ? new Date(dateOfBirth).getFullYear() : 'joining'}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
                                            <Trophy className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 font-medium">No favorite player selected</p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Update your profile to add your favorite player
                                        </p>
                                    </div>
                                )}

                                {/* Fan Stats Placeholder */}
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-2xl font-bold text-oly-red-dark">∞</p>
                                            <p className="text-xs text-gray-500 mt-1">Loyalty Score</p>
                                        </div>
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-2xl font-bold text-oly-red-dark">100%</p>
                                            <p className="text-xs text-gray-500 mt-1">Support Level</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Stats */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Account Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                                <div className="text-2xl font-bold text-blue-700">Active</div>
                                <div className="text-sm text-blue-600 mt-1">Status</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                                <div className="text-2xl font-bold text-green-700">Member</div>
                                <div className="text-sm text-green-600 mt-1">Role</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
                                <div className="text-2xl font-bold text-purple-700">
                                    {dateOfBirth ? new Date(dateOfBirth).getFullYear() : 'N/A'}
                                </div>
                                <div className="text-sm text-purple-600 mt-1">Member Since</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200">
                                <div className="text-2xl font-bold text-amber-700">Red & White</div>
                                <div className="text-sm text-amber-600 mt-1">Club Colors</div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <div className="mt-8 text-center">
                        <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-oly-red-dark to-oly-red text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all">
                            <User className="w-5 h-5" />
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;