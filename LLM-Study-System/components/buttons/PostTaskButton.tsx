'use client'
import { useTopicGradingStore } from '@/src/topicgrades';
import { usePageStore } from '@/src/pagecounter';
import { useTimeDataStore } from '@/src/time';
import next from 'next';
import { useState } from 'react';
import PostTaskUserFeedback from '../PostTaskUserFeedback';


export default function PostTaskButton() {

    const topicGrads = useTopicGradingStore();
    const setTime = useTimeDataStore((state) => state.setTimeData);
    const nextPage = usePageStore((state) => state.increse);
    const [showUserFeedback, setVisbility] = useState(false);

    // I dont where 'evalGrade' gets removed, thats why there is the undefined check. I dont know if this a good strat but it should work out.
    const handleClick = () => {
        if (topicGrads['topicGrading']['evalGrade'] !== '' && topicGrads['topicGrading']['evalGrade'] !== undefined) {
            setTime({ postTask: new Date().toLocaleTimeString() });
            nextPage(1);
        } else {
            setVisbility(true);
        }
    }
    return (
        <>
            {showUserFeedback && <PostTaskUserFeedback />}
            <div>
                <button className="bg-custom-accent p-2 font-semibold my-3" onClick={() => handleClick()}>Continue</button>
            </div>
        </>
    )
}
