import { create } from 'zustand'

interface MildnessState {
    mildness: boolean;
    setMildness: (by: boolean) => void;
}

export const useMildnessStore = create<MildnessState>()((set) =>({
    mildness: false,
    setMildness: (by) => set(({mildness: by}))
}));