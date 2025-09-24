"use client";

import { Button } from "@/components/ui/button";
import { Pill, Leaf } from "lucide-react";

interface TreatmentPreferenceSelectorProps {
    onSelectPreference: (preference: string) => void;
}

export function TreatmentPreferenceSelector({ onSelectPreference }: TreatmentPreferenceSelectorProps) {
    const preferences = [
        { 
            value: "medicine", 
            label: "Medicine Recommendations", 
            icon: Pill,
            description: "Get medicine suggestions"
        },
        { 
            value: "home_remedies", 
            label: "Home Remedies", 
            icon: Leaf,
            description: "Natural & home treatments"
        },
        { 
            value: "both", 
            label: "Both", 
            icon: null,
            description: "Medicine + Home remedies"
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white/80 backdrop-blur-md z-50">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-3">
                    <p className="text-sm text-gray-600">What type of treatment would you prefer?</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {preferences.map((pref) => (
                        <Button
                            key={pref.value}
                            onClick={() => onSelectPreference(pref.value)}
                            className="rounded-full px-6 py-3 flex items-center gap-2 flex-col sm:flex-row min-h-[60px] sm:min-h-[40px]"
                            variant="outline"
                        >
                            {pref.icon && <pref.icon className="w-4 h-4" />}
                            <div className="flex flex-col sm:flex-row sm:gap-1 text-center sm:text-left">
                                <span className="font-medium text-sm">{pref.label}</span>
                                <span className="text-xs text-gray-500 sm:hidden">{pref.description}</span>
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}