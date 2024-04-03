'use client';
import { useState } from "react";
import { KeyboardEvent } from 'react';
import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from 'eventsource-parser';
import TaskButton from "../buttons/TaskButton";
import React from "react";
import { useMessageStore } from "@/src/message";
import Loader from "./Loader";
import { generatePrompt } from "@/utils/prompt";
import { useTaskTopicStore } from "@/src/tasktopic";
import { useConditionStore } from "@/src/condition";



function ChatInput() {
    const [loading, setLoading] = useState(false);
    const [generatedAnswers, setGeneratedAnswers] = useState<String>('');
    const [showButton, setVisbility] = useState(false);
    const [counterChat, setCounterChat] = useState(0);
    const addMessageZustand = useMessageStore((state) => state.addMessage);
    const updateMessage = useMessageStore((state) => state.updateMessage);
    const messages = useMessageStore();
    const condition = useConditionStore();
    const taskTopic = useTaskTopicStore();

    const generateAnswer = async (e: any, prompt: string) => {
        e.preventDefault();
        setGeneratedAnswers("");
        setLoading(true);
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
            }),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = response.body;
        if (!data) {
            return;
        }
        let currentID = counterChat + 1;
        let updateCounter = 0
        let update_string = ""
        const onParseGPT = (event: ParsedEvent | ReconnectInterval) => {
            if (event.type === 'event') {
                const data = event.data;
                try {
                    const text = JSON.parse(data).text ?? '';
                    setGeneratedAnswers((prev) => prev + text);
                    update_string += text
                    if (updateCounter === 0) {
                        addMessageZustand({ id: currentID, user: "System", content: update_string as string, timestamp: new Date().toLocaleTimeString() })
                    } else {
                        updateMessage({ id: currentID, user: "System", content: update_string as string, timestamp: new Date().toLocaleTimeString() })
                    }
                    updateCounter++;
                } catch (e) {
                    console.error(e);
                }
            }
        };
        const reader = data.getReader();
        const decoder = new TextDecoder();
        const parser = createParser(onParseGPT);
        let done = false;
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            parser.feed(chunkValue);
        }
        setLoading(false);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (!loading) {
            if (event.key === 'Enter' && !event.shiftKey) {
                const messageText = event.currentTarget.value.trim();
                if (messageText !== '') {
                    addMessageZustand({
                        id: counterChat,
                        user: "User",
                        content: messageText,
                        timestamp: new Date().toLocaleTimeString()
                    }
                    );
                    event.currentTarget.value = '';
                    if (counterChat === 0) {
                        generateAnswer(event, generatePrompt(messageText, taskTopic.taskTopic, condition.condition, null));
                    } else {
                        generateAnswer(event, generatePrompt(messageText, taskTopic.taskTopic, condition.condition, messages.messages));
                    }

                    if (!showButton) {
                        setVisbility(true);
                    }
                    setCounterChat(counterChat + 2);
                }
            }
        }
    }
    return (
        <div className="justify-center items-center flex-col w-full pb-2.5 bg-custom-bg sticky bottom-0 border-t border-custom-text">
            <div className="justify-center items-center flex flex-col px-2.5">
                <div>
                    {loading && <Loader />}
                </div>
                <textarea
                    className="bg-transparent w-full sm:w-[70%] mx-5 border-neutral-900 border-2 focus:border-[3px] focus:outline-none shadow-xl focus:ring-0
                    rounded-lg mt-3"
                    placeholder="Type a message..."
                    id="message-input"
                    defaultValue={""}
                    onKeyDown={handleKeyDown}
                />
            </div>
            {showButton && <TaskButton />}
        </div>
    );
};

export default ChatInput;