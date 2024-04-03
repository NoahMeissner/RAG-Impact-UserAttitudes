import { create } from 'zustand'

interface PageState {
    page: number;
    increse: (by: number) => void;
}

export const usePageStore = create<PageState>()((set) =>({
    page: 0,
    increse: (by) => set((state) => ({page: state.page + by}) )
}))