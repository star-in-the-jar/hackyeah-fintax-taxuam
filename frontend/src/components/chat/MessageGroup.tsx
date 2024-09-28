import ChatMessageBubble from "@/components/chat/MessageBubble";
import ChatInput from "./Input";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";

const MessageGroup = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl mb-4">Group 1</h3>
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
        <div className="space-y-4 mb-4">
          <ChatMessageBubble
            message={{
              role: "assistant",
              content: "Witaj",
            }}
          />
          <ChatMessageBubble
            message={{
              role: "user",
              content: "Siema gpt",
            }}
          />
          <ChatMessageBubble
            message={{
              role: "user",
              content: "Siema gpt",
            }}
          />
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default MessageGroup;
