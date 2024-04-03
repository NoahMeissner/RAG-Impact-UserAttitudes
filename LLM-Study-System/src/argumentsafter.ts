import { create } from 'zustand'

interface ArgumentsAfterState {
    arguments: string;
    setArgumentsAfter: (by: string) => void;
}

export const useArgumentsAfterStore = create<ArgumentsAfterState>()((set) =>({
    arguments: "",
    setArgumentsAfter: (by) => set(({arguments: by}))
}));