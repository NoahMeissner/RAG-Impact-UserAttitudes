'use client'
import { useArgumentsBeforeStore } from "@/src/argumentbefore";
import { useArgumentsAfterStore } from "@/src/argumentsafter";

interface ArgumenTextareaProps {
  changeArgument: (value: string) => void;
  argument: any;
}

export default function ArgumentTextarea({ changeArgument, argument }: ArgumenTextareaProps) {

  return (
    <textarea className="w-full sm:w-[75%] bg-transparent border-neutral-900 border-2 focus:outline-none focus:border-[3px] shadow-xl focus:ring-0 rounded-lg h-32 mt-3"
      value={argument['arguments']}
      placeholder="Type a message..."
      id="message-input"
      onChange={(e) => changeArgument(e.currentTarget.value)} />
  );
}
