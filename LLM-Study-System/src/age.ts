import { create } from 'zustand'

// Does this make senese? Not really but then i would have to figure out how i set input to only numeric values :() 
interface AgeState {
    age: string;
    setAge: (by: string) => void;
}

export const useAgeStore = create<AgeState>()((set) =>({
    age: "",
    setAge: (by) => set(({age: by}))
}));