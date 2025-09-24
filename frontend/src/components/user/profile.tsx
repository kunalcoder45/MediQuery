// src/components/user/Profile.tsx

"use client";

import React from 'react';
import { User } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { BadgeCheck } from 'lucide-react';

interface ProfileProps {
    user: User;
}

export function Profile({ user }: ProfileProps) {
    const { logout } = useAuth();
    const router = useRouter();

    const getFallback = (email: string | null) => {
        return email ? email.charAt(0).toUpperCase() : 'U';
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/'); // Redirect to the homepage after logging out
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-4 h-full">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage
                    src={user.photoURL || undefined}
                    alt={user.displayName || user.email || undefined}
                />
                <AvatarFallback className="text-4xl">{getFallback(user.email)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
                <h1 className="text-2xl font-bold">{user.displayName || user.email}</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.emailVerified && (
                    <div className="flex justify-center items-center mt-1">
                        <p className="text-xs text-green-500 font-semibold flex items-center">
                            Email Verified
                            <BadgeCheck className="w-4 h-4 ml-1" />
                        </p>
                    </div>
                )}
            </div>
            {/* New logout button */}
            <div className="mt-4">
                <Button variant="destructive" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </div>
    );
}