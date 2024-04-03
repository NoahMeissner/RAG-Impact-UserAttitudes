import { create } from 'zustand'

interface conditionState {
    condition: string;
    setCondition: (by: string) => void;
}

export const useConditionStore = create<conditionState>()((set) =>({
    condition: "",
    setCondition: (by) => set(({condition: by}))
}));