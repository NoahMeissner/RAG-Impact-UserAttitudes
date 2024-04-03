import { create } from 'zustand'

interface DegreeProgrammState {
    degreeProgramm: string;
    setDegreeProgramm: (by: string) => void;
}

export const useDegreeProgrammStore = create<DegreeProgrammState>()((set) =>({
    degreeProgramm: "",
    setDegreeProgramm: (by) => set(({degreeProgramm: by}))
}));