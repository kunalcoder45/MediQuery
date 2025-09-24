import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
    const { user, updateUserProfile, deleteAccount, logout, error } = useAuth();
    const [editing, setEditing] = useState(false);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserProfile({ displayName });
            setMessage('Profile updated successfully!');
            setEditing(false);
        } catch (error) {
            console.error('Profile update error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await deleteAccount();
                setMessage('Account deleted successfully!');
            } catch (error) {
                console.error('Account deletion error:', error);
            }
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>

            {message && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {message}
                </div>
            )}

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div className="text-center">
                    {user.photoURL && (
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-20 h-20 rounded-full mx-auto mb-4"
                        />
                    )}
                </div>

                {editing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Display Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex space-x-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Display Name</label>
                            <p className="text-gray-900">{user.displayName || 'Not set'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="text-gray-900">{user.email}</p>
                            {!user.emailVerified && (
                                <span className="text-sm text-red-500">Not verified</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Account Created</label>
                            <p className="text-gray-900">{new Date(user.metadata.creationTime).toLocaleDateString()}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-2 pt-4 border-t">
                    <button
                        onClick={() => setEditing(!editing)}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        {editing ? 'Cancel Edit' : 'Edit Profile'}
                    </button>

                    <button
                        onClick={logout}
                        className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                    >
                        Sign Out
                    </button>

                    <button
                        onClick={handleDeleteAccount}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;