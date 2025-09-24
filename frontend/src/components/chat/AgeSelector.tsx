// // src/components/chat/AgeSelector.tsx
// "use client";

// import { Button } from "@/components/ui/button";

// interface AgeSelectorProps {
//     onSelectAge: (age: string) => void;
// }

// export function AgeSelector({ onSelectAge }: AgeSelectorProps) {
//     const ageRanges = ["<18", "18-35", "36-50", "51-65", ">65"];

//     return (
//         <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white/80 backdrop-blur-md z-50">
//             <div className="container mx-auto max-w-4xl flex gap-2 justify-center">
//                 {ageRanges.map((range) => (
//                     <Button
//                         key={range}
//                         onClick={() => onSelectAge(range)}
//                         className="rounded-full px-6"
//                     >
//                         {range}
//                     </Button>
//                 ))}
//             </div>
//         </div>
//     );
// }



// src/components/chat/AgeSelector.tsx
"use client";

import { Button } from "@/components/ui/button";

interface AgeSelectorProps {
    onSelectAge: (age: string) => void;
}

export function AgeSelector({ onSelectAge }: AgeSelectorProps) {
    const ageRanges = ["<18", "18-35", "36-50", "51-65", ">65"];

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white/80 backdrop-blur-md z-50">
            <div className="container mx-auto max-w-4xl flex flex-wrap justify-center gap-2 sm:flex-row">
                {ageRanges.map((range) => (
                    <Button
                        key={range}
                        onClick={() => onSelectAge(range)}
                        className="rounded-full px-6 flex-grow-0 sm:flex-grow"
                    >
                        {range}
                    </Button>
                ))}
            </div>
        </div>
    );
}
