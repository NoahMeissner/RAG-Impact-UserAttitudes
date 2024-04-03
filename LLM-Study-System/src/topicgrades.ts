import { create } from 'zustand'

interface TopicGrading {
    firstTopic: string;
    secondTopic: string;
    thirdTopic: string;
    evalGrade: string;
}
  
interface TopicGradingState {
    topicGrading: TopicGrading;
    setTopicGrade: (newValues: Partial<TopicGrading>) => void;
}
  
export const useTopicGradingStore = create<TopicGradingState>()((set) => ({
    topicGrading: {
      firstTopic: '',
      secondTopic: '',
      thirdTopic: '',
      evalGrade: '',
    },
    setTopicGrade: (newValue) =>
      set((state) => ({
        topicGrading: { ...state.topicGrading, ...newValue }
      })),
}));