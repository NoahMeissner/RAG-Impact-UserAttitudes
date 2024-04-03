import { create } from 'zustand'

interface GenderState {
    gender: string;
    setGender: (by: string) => void;
}

export const useGenderStore = create<GenderState>()((set) =>({
    gender: "",
    setGender: (by) => set(({gender: by}))
}));