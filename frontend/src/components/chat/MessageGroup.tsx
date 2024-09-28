import ChatMessageBubble from "@/components/chat/MessageBubble";
import ChatInput from "./Input";
import ChatQuestionTile from "./QuestionTile";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
import { Field, useStateManager } from "@/state";
import { Message } from "@/types";

const MessageGroup = (props: { field: Field }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { updateState } = useStateManager();

  const sendMessage = (value: string) => {
    const obj = {
      role: "user",
      content: value,
    } as Message;

    setIsLoading(true);

    updateState((draft) => {
      const f = draft.messages.find((f) => f.key === props.field.key);
      f?.messages.push(obj);
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div>
      <Button
        className="flex justify-between items-center w-full mb-1 py-6"
        variant="ghost"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className="text-2xl font-medium">{props.field.key}</span>
        <FaChevronDown
          className={[
            "transition-transform",
            !isCollapsed ? "transform rotate-180" : "",
          ].join(" ")}
        />
      </Button>
      <div
        className={[
          "ml-4 pl-4 border-l",
          isCollapsed ? "hidden" : "block",
        ].join(" ")}
      >
        <ChatQuestionTile field={props.field} />
        <div className="space-y-4 mb-4">
          {props.field.messages.map((message, index) => (
            <ChatMessageBubble key={index} message={message} />
          ))}
        </div>
        {isLoading && (
          <div className="bg-white p-3 rounded-lg ml-4 w-fit max-w-xs my-[5px]">
            <div className="flex space-x-2">
              <div className="animate-bounce bg-gray-500 rounded-full h-3 w-3"></div>
              <div className="animate-bounce bg-gray-500 rounded-full h-3 w-3 delay-100"></div>
              <div className="animate-bounce bg-gray-500 rounded-full h-3 w-3 delay-200"></div>
            </div>
          </div>
        )}
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default MessageGroup;
