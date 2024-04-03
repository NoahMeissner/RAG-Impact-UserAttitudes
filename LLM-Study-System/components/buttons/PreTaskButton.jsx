'use client'
import { usePageStore } from '@/src/pagecounter';
import { useTimeDataStore } from '@/src/time';


function PreTaskButton() {

    const setTime = useTimeDataStore((state) => state.setTimeData);
    const nextPage = usePageStore((state) => state.increse);
    const handleClick = () => {
        setTime({ preTask: new Date().toLocaleTimeString() });
        nextPage(1);
    }
    return (
        <button className="bg-custom-accent p-2 font-semibold mt-3" onClick={() => handleClick()}>Continue</button>
    )
}

export default PreTaskButton;