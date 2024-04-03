'use client'
import { useTimeDataStore } from '@/src/time';
import { useAgeStore } from "@/src/age";
import { useLevelOfEducationStore } from "@/src/education";
import { useGenderStore } from '@/src/gender';
import { useOccupationStore } from '@/src/occupation';
import { useVPStore } from '@/src/vp';
import { usePageStore } from '@/src/pagecounter';
import { useState } from 'react';
import UserFeedback from '../UserFeedback';
import { useArgumentsBeforeStore } from '@/src/argumentbefore';
import { useArgumentsAfterStore } from '@/src/argumentsafter';
import { useTaskTopicStore } from '@/src/tasktopic';
import { useTopicGradingStore } from '@/src/topicgrades';
import { useConditionStore } from '@/src/condition';
import { useMildnessStore } from '@/src/mildness';
import { useMessageStore } from '@/src/message';
import { useSurveyIDStore } from '@/src/surveyid';

export default function SubmitButton() {

    const setTime = useTimeDataStore((state) => state.setTimeData);
    const nextPage = usePageStore((state) => state.increse)
    const { age } = useAgeStore();
    const { levelOfEducation } = useLevelOfEducationStore();
    const { gender } = useGenderStore();
    const { occupation } = useOccupationStore();
    const argumentBefore = useArgumentsBeforeStore();
    const argumentsAfter = useArgumentsAfterStore();
    const { taskTopic } = useTaskTopicStore();
    const { topicGrading } = useTopicGradingStore();
    const { timeData } = useTimeDataStore();
    const { condition } = useConditionStore()
    const { mildness } = useMildnessStore();
    const { messages } = useMessageStore();

    const setSurveyID = useSurveyIDStore((state) => state.setSurveyID);
    const { surveyID } = useSurveyIDStore();

    const setVP = useVPStore((state) => state.setVP);

    const [showUserFeedback, setVisbility] = useState(false);

    const handleclick = () => {

        const submitData = async () => {
            const response = await fetch('/api/submitUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "age": age,
                    "gender": gender,
                    "levelOfEducation": levelOfEducation,
                    "occupation": occupation,
                    "argumentsBefore": argumentBefore['arguments'],
                    "argumentsAfter": argumentsAfter['arguments'],
                    "taskTopic": taskTopic,
                    "topicGrading": topicGrading,
                    "timestamps": timeData,
                    "condition": condition,
                    "mildness": mildness,
                    "dateOfSubmission": new Date()
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const { participant_id } = data;
                setSurveyID(participant_id);
                const responseMessages = await fetch('/api/sumbitMessages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        participant_id,
                        messages
                    }),
                });
            }
        }

        if (age !== '' && levelOfEducation !== '' && gender !== '' && occupation !== '') {
            if (occupation.toLocaleLowerCase().includes('student')) {
                setVP(true);
            }
            submitData();
            nextPage(1);
        } else {
            setVisbility(true);
        }

    }
    return (
        <>
            {showUserFeedback && <UserFeedback feedbackText='Before you can submit the data, you must complete all the forms on this page!' />}
            <button className='bg-custom-accent p-2 font-semibold mt-3' onClick={() => handleclick()}>Submit</button>
        </>
    );
};