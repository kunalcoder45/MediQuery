// src/components/chat/GenderSelector.tsx
"use client";

import { Button } from "@/components/ui/button";

interface GenderSelectorProps {
    onSelectGender: (gender: string) => void;
}

export function GenderSelector({ onSelectGender }: GenderSelectorProps) {
    const genders = ["Male", "Female", "Other", "Prefer not to say"];

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white/80 backdrop-blur-md z-50">
            <div className="container mx-auto max-w-4xl flex flex-wrap justify-center gap-2 sm:flex-row">
                {genders.map((gender) => (
                    <Button
                        key={gender}
                        onClick={() => onSelectGender(gender)}
                        className="rounded-full px-6 flex-grow-0 sm:flex-grow"
                    >
                        {gender}
                    </Button>
                ))}
            </div>
        </div>
    );
}
