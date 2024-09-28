import ChatMessageBubble from "@/components/chat/MessageBubble";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/useChat";
import { Message } from "@/types";
import { ReactNode, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import Loader from "../ui/loader";
import ChatInput from "./Input";
import ChatQuestionTile from "./QuestionTile";

export const AutonomousMessageGroup = ({ label, children }: {
  label: string,
  children?: ReactNode
}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const currentMessagesRef = useRef<Message[]>()

  return <MessageGroup
    label={label}
    messages={messages}
    children={children}
    onNewMessage={(msg) => {
      if (!currentMessagesRef.current) {
        currentMessagesRef.current = messages
      }

      currentMessagesRef.current = [
        ...currentMessagesRef.current,
        msg
      ]

      setMessages(currentMessagesRef.current)
    }} />
}

const MessageGroup = ({
  messages, onNewMessage,
  children,
  label
}: {
  messages: Message[],
  onNewMessage: (message: Message) => void,
  children?: ReactNode
  label: string
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage: chatSendMessage } = useChat();

  const sendMessage = (value: string) => {
    setIsLoading(true);
    onNewMessage({
      role: "user",
      content: value,
    })

    chatSendMessage(messages)
      .then((newMessage) => {
        onNewMessage(newMessage)
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  return (
    <div>
      <Button
        className="flex justify-between items-center w-full mb-1 py-6"
        variant="ghost"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className="text-2xl font-medium">{label}</span>
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
        {children}
        <div className="space-y-4 mb-4">
          {messages.map((message, index) => (
            <ChatMessageBubble key={index} message={message} />
          ))}
        </div>
        {isLoading ? <Loader /> : null}
        <ChatInput isLoading={isLoading} onSend={sendMessage} />
      </div>
    </div>
  );
};

export default MessageGroup;
