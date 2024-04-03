import { create } from 'zustand'

interface FirstNameState {
    firstName: string;
    setFirstName: (by: string) => void;
}

export const useFirstNameStore = create<FirstNameState>()((set) =>({
    firstName: "",
    setFirstName: (by) => set(({firstName: by}))
}));