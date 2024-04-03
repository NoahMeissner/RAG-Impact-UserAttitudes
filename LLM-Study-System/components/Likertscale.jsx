'use client'

import { useTopicGradingStore } from '@/src/topicgrades'


function Likertscale({ topic, valuation }) {

  const setTopicGrade = useTopicGradingStore((state) => state.setTopicGrade)

  const handleRadioChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    if (!valuation) {
      switch (topic) {
        case "Should students wear school uniform?":
          setTopicGrade({ firstTopic: selectedValue });
          break;
        case "Should intellectual property rights exist?":
          setTopicGrade({ secondTopic: selectedValue });
          break;
        case "Is Obesity a Disease?":
          setTopicGrade({ thirdTopic: selectedValue });
          break;
      }
    } else {
      setTopicGrade({ evalGrade: selectedValue });
    }
  };
  return (
    <div className='flex justify-center text-center'>
      <div className="inline-grid sm:flex sm:content-center sm:justify-center">
        <p className="">Strongly Disagree</p>
        <ul className="list-none px-5 place-content-around place-items-center inline-grid sm:flex" id={topic}>
          {[...Array(7).keys()].map((index) => (
            <li key={index} className="px-2 scale-150">
              <input
                id={`${topic}-answer-${index + 1}-li`}
                type="radio"
                name={topic}
                value={index - 3}
                onChange={handleRadioChange}
              />
            </li>
          ))}
        </ul>
        <p>Strongly Agree</p>
      </div>
    </div>
  );
}

export default Likertscale;