import { create } from 'zustand'

interface MartikelState {
    matrikel: string;
    setMatrikel: (by: string) => void;
}

export const useMatrikelStore = create<MartikelState>()((set) =>({
    matrikel: "",
    setMatrikel: (by) => set(({matrikel: by}))
}));