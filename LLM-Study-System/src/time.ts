import { create } from 'zustand'

interface TimeData {
    start: string;
    preStudy: string;
    preTask: string;
    taskDescription: string;
    task: string;
    postTask: string;
}

interface TimeDataState {
    timeData: TimeData;
    setTimeData: (newValues: Partial<TimeData>) => void;
}

export const useTimeDataStore = create<TimeDataState>()((set) => ({
    timeData: {
        start: '',
        informationConsent: '',
        preStudy: '',
        preTask: '',
        taskDescription:'',
        task: '',
        postTask: '',
    },
    setTimeData: (newValue: any) =>
      set((state) => ({
        timeData: { ...state.timeData, ...newValue }
      })),
}));