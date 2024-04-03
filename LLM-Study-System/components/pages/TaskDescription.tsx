/*
    This ist just a Page where we define the Text:
    This is the page where the user is only shown the description of the next page.
    We need to introduce a new variable in the TimeStore state where the submit is tracked. Whereby we could theoretically understand this as task time? But I don't know how clever that is?
*/

import { useTaskTopicStore } from "@/src/tasktopic";
import TaskDescriptionButton from "../buttons/TaskDescirptionButton";

export default function TaskDescription() {

    const { taskTopic } = useTaskTopicStore();

    return (
        <div className="flex flex-col text-center justify-center">
            <div className="text-center place-items-center mb-3">
                <h1>Task</h1>
            </div>
            <div className="px-5 flex justify-center">
                <div className="task-box mb-3 max-w-prose place-items-center px-5 border border-neutral-900">
                    <p className="text-padding text-center">
                        The question &quot;{taskTopic}&quot; is a much-discussed topic these days, and there are many different opinions about it. You would like to find out more about the issue and understand the arguments so that you can form your own opinion. You have found this chat based search engine and you will use the following to answer your questions.
                    </p>
                </div>
            </div>
            <TaskDescriptionButton />
        </div>
    );
}