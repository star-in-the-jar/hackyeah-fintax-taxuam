import { ReactNode, useMemo, useRef, useState } from "react";
import { Message } from "../../types";

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
  children,
  label,
}: {
  messages: Message[];
  onNewMessage: (message: Message) => void;
  onTempMessage: (message: Message | null) => void;
  children?: ReactNode;
  label: string;
}) => {
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
