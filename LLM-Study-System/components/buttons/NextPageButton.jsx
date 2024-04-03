'use client';
import React from 'react'
import { usePageStore } from '@/src/pagecounter';
import { useTimeDataStore } from '@/src/time';

// At the moment only used in the intro.page -> Later we want to give it a parameter to check if it should track time. This way we can use it also for the information consent.
const NextPageButton = ({timeVar, buttonText}) => {
    const nextPage = usePageStore((state) => state.increse);
    const setTime = useTimeDataStore((state) => state.setTimeData);

    const handleClick = () => {
        setTime({ [timeVar]: new Date().toLocaleTimeString() })
        nextPage(1);
        window.scrollTo(0, 0);
    }

    return (
        <div className='text-center mb-3'>
            <button className='bg-custom-accent p-2 font-semibold' onClick={handleClick}>{buttonText}</button>
        </div>
    )
}

export default NextPageButton