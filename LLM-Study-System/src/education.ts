import { create } from 'zustand'

interface EducationState {
    levelOfEducation: string;
    setlevelOfEducation: (by: string) => void;
}

export const useLevelOfEducationStore = create<EducationState>()((set) =>({
    levelOfEducation: "",
    setlevelOfEducation: (by) => set(({levelOfEducation: by}))
}));