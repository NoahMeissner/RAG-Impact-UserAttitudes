'use client';
import { useLevelOfEducationStore } from "@/src/education";

export default function Education() {

    const setLevelOfEducation = useLevelOfEducationStore((state) => state.setlevelOfEducation)

    return (
        <select id="highest-level-of-education" className="h-6 w-full border border-custom-text bg-transparent"
            style={{ fontFamily: "'__Inter_aaf875', '__Inter_Fallback_aaf875', sans-serif" }}
            onChange={(e) => setLevelOfEducation(e.target.value)}>
            <option disabled selected>
                Select an option
            </option>
            <option id="placeholder">Less than high school</option>
            <option id="placeholder">High school</option>
            <option id="placeholder">Bachelor</option>
            <option id="placeholder">Master</option>
            <option id="placeholder">Doctorate</option>
            <option id="none">Don&apos;t want to specify</option>
        </select>);
}