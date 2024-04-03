import { create } from 'zustand'

interface LastNameState {
    lastName: string;
    setLastName: (by: string) => void;
}

export const useLastNameStore = create<LastNameState>()((set) =>({
    lastName: "",
    setLastName: (by) => set(({lastName: by}))
}));