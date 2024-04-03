import { create } from 'zustand'

interface TaskTopicState {
    taskTopic: string;
    setTaskTopic: (by: string) => void;
}

export const useTaskTopicStore = create<TaskTopicState>()((set) =>({
    taskTopic: "",
    setTaskTopic: (by) => set(({taskTopic: by}))
}));