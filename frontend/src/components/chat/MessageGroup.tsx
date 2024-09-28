import ChatMessageBubble from "@/components/chat/MessageBubble";
import ChatInput from "./Input";
import ChatQuestionTile from "./QuestionTile";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
import { Field, useStateManager } from "@/state";
import { Message } from "@/types";

const MessageGroup = (props: { field: Field }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { updateState } = useStateManager();

  const sendMessage = (value: string) => {
    const obj = {
      role: "user",
      content: value,
    } as Message;

    updateState((draft) => {
      const f = draft.messages.find((f) => f.key === props.field.key);

      f?.messages.push(obj);
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl mb-4">{props.field.key}</h3>
        <Button variant="ghost" onClick={() => setIsCollapsed(!isCollapsed)}>
          <FaChevronDown
            className={[
              "transition-transform",
              !isCollapsed ? "transform rotate-180" : "",
            ].join(" ")}
          />
        </Button>
      </div>
      <div
        className={[
          "ml-2 pl-2 border-l",
          isCollapsed ? "hidden" : "block",
        ].join(" ")}
      >
        <ChatQuestionTile field={props.field} />
        <div className="space-y-4 mb-4">
          {props.field.messages.map((message) => {
            return <ChatMessageBubble message={message} />;
          })}
        </div>
        {/* TUTAJ LOADER */}
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default MessageGroup;
