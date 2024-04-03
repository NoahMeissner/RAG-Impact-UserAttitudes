import { create } from 'zustand'

interface ArgumentsBeforeState {
    arguments: string;
    setArgumentsBefore: (by: string) => void;
}

export const useArgumentsBeforeStore = create<ArgumentsBeforeState>()((set) =>({
    arguments: "",
    setArgumentsBefore: (by) => set(({arguments: by}))
}));