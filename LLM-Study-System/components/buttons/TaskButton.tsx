'use client';
import { useMessageStore } from '@/src/message';
import { usePageStore } from '@/src/pagecounter';
import { useTimeDataStore } from '@/src/time';

import React from 'react'

const TaskButton = ({ }) => {

    const setTime = useTimeDataStore((state) => state.setTimeData);
    const nextPage = usePageStore((state) => state.increse);

    const handleClick = () => {
        setTime({ task: new Date().toLocaleTimeString() });
        nextPage(1);
    }
    return (
        <div className='text-center'>
            <button className='bg-custom-accent p-2 font-semibold mt-3' onClick={handleClick}>Next Page</button>
        </div>
    )
}

export default TaskButton