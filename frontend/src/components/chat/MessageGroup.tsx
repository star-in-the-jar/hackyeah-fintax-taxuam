import ChatMessageBubble from "@/components/chat/MessageBubble";
import { useChat } from "@/hooks/useChat";
import { Message } from "@/types";
import { ReactNode, useMemo, useRef, useState } from "react";

export const AutonomousMessageGroup = ({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) => {
  const [tempMessage, setTempMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const currentMessagesRef = useRef<Message[]>();

  const realMessages = useMemo(() => {
    if (!tempMessage) return messages;
    return [...messages, tempMessage];
  }, [messages, tempMessage]);

  return (
    <MessageGroup
      label={label}
      messages={realMessages}
      children={children}
      onTempMessage={(msg) => {
        setTempMessage(msg);
      }}
      onNewMessage={(msg) => {
        if (!currentMessagesRef.current) {
          currentMessagesRef.current = messages;
        }

        currentMessagesRef.current = [...currentMessagesRef.current, msg];

        setMessages(currentMessagesRef.current);
      }}
    />
  );
};

const MessageGroup = ({
  messages,
  onNewMessage,
  onTempMessage,
  children,
  label,
}: {
  messages: Message[];
  onNewMessage: (message: Message) => void;
  onTempMessage: (message: Message | null) => void;
  children?: ReactNode;
  label: string;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage: chatSendMessage } = useChat();

  const sendMessage = (value: string) => {
    setIsLoading(true);
    onNewMessage({
      role: "user",
      content: value,
    });

    chatSendMessage(
      [
        ...messages,
        {
          role: "user",
          content: value,
        },
      ],
      (text) => {
        onTempMessage({
          role: "assistant",
          content: text,
        });
      }
    )
      .then((newMessage) => {
        onNewMessage(newMessage);
      })
      .finally(() => {
        onTempMessage(null);
        setIsLoading(false);
      });
  };

  const ChatMessages = () =>
    messages.map((message, idx) => (
      <ChatMessageBubble key={idx} message={message} />
    ));

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-2 items-center w-full mb-4">
        <p id={label} className="text-lg font-medium text-nowrap">
          {label}
        </p>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </div>
  );
};

export default MessageGroup;
