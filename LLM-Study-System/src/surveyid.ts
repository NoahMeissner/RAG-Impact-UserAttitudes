import { create } from 'zustand'

interface SurveyIDState{
    surveyID: string;
    setSurveyID: (by: string) => void;
}

export const useSurveyIDStore = create<SurveyIDState>()((set) =>({
    surveyID: "",
    setSurveyID: (by) => set(({surveyID: by}))
}));