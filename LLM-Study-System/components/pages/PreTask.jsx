import SelectedTaskBox from "@/components/SelectedTaskBox";
import PreTaskButton from "@/components/buttons/PreTaskButton";
import ArgumenTextarea from "@/components/ArgumenTextarea";
import { useMildnessStore } from '@/src/mildness';
import { useTaskTopicStore } from '@/src/tasktopic';
import { useArgumentsBeforeStore } from '@/src/argumentbefore';

function PreTask() {
    const mildness = useMildnessStore();
    const taskTopic = useTaskTopicStore();

    const changeArgument = useArgumentsBeforeStore((state) => state.setArgumentsBefore);
    const argument = useArgumentsBeforeStore();

    let headline = "You previously selected that you did have a strong opinion about the following topic:"
    if (mildness['mildness'] === true) {
        headline = "You previously selected that you did not have a strong opinion about the following topic:"
    }
    return (
        <div className="flex flex-col justify-center items-center text-center px-5">
            <h1>{headline}</h1>
            <SelectedTaskBox topic={taskTopic['taskTopic']} />
            <p>If you had to explain, which arguments for and against do you see in the following topic. Please explain your thinking.
                <br />
                (It&apos;s okay if you don&apos;t know anything about the subject - you are not forced to write anything.)
            </p>
            <ArgumenTextarea argument={argument} changeArgument={changeArgument} />
            <PreTaskButton />
        </div>
);
}


export default PreTask