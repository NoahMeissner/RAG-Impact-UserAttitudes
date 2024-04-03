import ChatInput from "@/components/chatSystem/ChatInput";
import Message from "@/components/chatSystem/Message";
import { useMessageStore } from '@/src/message';
import { useEffect, useRef } from 'react';
import { useTaskTopicStore } from '@/src/tasktopic';


function Task() {
    const { messages } = useMessageStore();
    const chatMessagesRef = useRef(null);
    const taskTopic = useTaskTopicStore();

    // The scroll Function comes from the following post of stackoverflow:
    // https://stackoverflow.com/a/52266212
    const scrollToBottom = () => {
        chatMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div id='task-root' className="flex-col flex w-full min-h-[100vh]">
            <div className='flex-1 overflow-hidden'>
                <div className='relative h-full'>
                    <div className='w-full h-full overflow-y-auto'>
                        <div className='flex flex-col'>
                            <div className='fixed top-0 w-full h-[40px]'>
                                <div className='flex flex-col w-full border-b border-custom-text bg-custom-bg justify-center text-center'>
                                    <h2 className='py-2'>Topic: {taskTopic['taskTopic']}</h2>
                                </div>
                            </div>
                            <div className="flex w-full sm:w-[70%] p-2 h-full sm:border border-custom-text m-auto overflow-hidden self-center w-128 mt-[40px]">
                                <div className="w-full h-full">
                                    <div className="overflow-y-scroll overflow-x-hidden p-2.5 break-words" id="chat-messages">
                                        {messages.map((message) => (
                                            <Message key={message.id} id={message.id} user={message.user} message={message.content} />
                                        ))}
                                        <div ref={chatMessagesRef} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChatInput />
        </ div>
    )
}

export default Task;