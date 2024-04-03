import { create } from 'zustand'

// This Stores the informatin if user accepts the condition

interface ICStore {
    accept_ic: boolean;
    setIC: (by: boolean) => void;
}

export const useICStore = create<ICStore>()((set) =>({
    accept_ic: false,
    setIC: (by) => set(({accept_ic: by}))
}));