'use client';
import { useAgeStore } from "@/src/age";

export default function AgeInput() {
    const setAge = useAgeStore((state) => state.setAge)

    // Solution for checking if InputIsNumber is from stackoverflow:
    // https://stackoverflow.com/a/65138192 -> Replaced the Depracted Method with the new one -> OnKeyDown
    // This solution didnt allow the usage of the deletekey thats why i modified it.

    return (
        <input type="text" className="h-6 w-full border-custom-text border" onChange={(e) => setAge(e.target.value)} onKeyDown={(event) => {
            if (event.key !== 'Backspace') {
                if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                }
            }
        }} placeholder="e.g.18" id="age"></input>
    );
}