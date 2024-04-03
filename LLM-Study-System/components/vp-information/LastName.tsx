'use client';
import { useLastNameStore } from "@/src/lastname";

export default function LastName() {
    const setLastName = useLastNameStore((state) => state.setLastName)
    return (
        <input
            id="lastName"
            className="h-6 w-full text-custom-accent-text"
            type="text"
            placeholder="e.g Mustermann"
            onChange={(e) => setLastName(e.target.value)}
        ></input>
    );
}