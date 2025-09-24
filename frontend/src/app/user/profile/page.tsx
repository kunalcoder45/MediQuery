// src/app/user/page.tsx

"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Profile } from '@/components/user/profile';

const page = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!user) {
        // Redirect to login if not authenticated
        // In a real app, you would use Next.js middleware or router.push()
        return <div className="flex justify-center items-center h-screen">Please log in to view this page.</div>;
    }

    return (
        <div className="container h-screen mx-auto">
            <Profile user={user} />
        </div>
    );
};



export default page;