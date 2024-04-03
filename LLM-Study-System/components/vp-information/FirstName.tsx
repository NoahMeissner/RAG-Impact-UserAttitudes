'use client';
import { useFirstNameStore } from "@/src/firstname";

export default function FirstName() {
    const setFirstName = useFirstNameStore((state) => state.setFirstName)
    return (
        <input
            id="firstName"
            className="h-6 w-full text-custom-accent-text"
            type="text"
            placeholder="e.g Max"
            onChange={(e) => setFirstName(e.target.value)}
        ></input>
    );
}