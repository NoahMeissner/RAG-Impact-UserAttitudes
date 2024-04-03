import { create } from 'zustand'

interface OccupationState {
    occupation: string;
    setOccupation: (by: string) => void;
}

export const useOccupationStore = create<OccupationState>()((set) =>({
    occupation: "",
    setOccupation: (by) => set(({occupation: by}))
}));