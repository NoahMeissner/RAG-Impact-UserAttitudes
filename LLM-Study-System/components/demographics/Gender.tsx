'use client'
import { useGenderStore } from "@/src/gender";

// When you optimize this you could probalby use one Selct Input for both gender and occupation but what do i know :()
export default function Gender() {
    const setGender = useGenderStore((state) => state.setGender)
    return (
        <select id="gender" className="h-6 w-full border border-custom-text bg-transparent"
            style={{ fontFamily: "'__Inter_aaf875', '__Inter_Fallback_aaf875', sans-serif" }}
            onChange={(e) => setGender(e.target.value)}>
            <option value="" disabled selected>
                Select an option
            </option>
            <option id="female">Female</option>
            <option id="male">Male</option>
            <option id="divers">Divers</option>
            <option id="none">Don&apos;t want to specify</option>
        </select>
    );
}