'use client';
import { useOccupationStore } from "@/src/occupation";

export default function Occupation() {
    const setOccupation = useOccupationStore((state) => state.setOccupation)
    return (
        <input
            id="occupation"
            className="h-6 w-full border border-custom-text"
            type="text"
            placeholder="e.g Student"
            onChange={(e) => setOccupation(e.target.value)}
        ></input>);
}
