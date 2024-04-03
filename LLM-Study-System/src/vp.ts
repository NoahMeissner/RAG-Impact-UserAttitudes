import { create } from 'zustand'

interface VPState {
    vp: boolean;
    setVP: (by: boolean) => void;
}

export const useVPStore = create<VPState>()((set) =>({
    vp: false,
    setVP: (by) => set(({vp: by}))
}));