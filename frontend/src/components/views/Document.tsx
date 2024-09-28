import Chat from "@/components/chat";
import { useParams } from "react-router-dom";
import ChatMessageBubble from "@/components/chat/MessageBubble";

const Document = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto max-w-3xl w-full py-10 px-4 lg:px-0 h-[calc(100vh-80px)]">
      <Chat title={id}>
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
        <ChatMessageBubble
          message={{
            role: "system",
            content: "Witaj",
          }}
        />
      </Chat>
    </div>
  );
};

export default Document;
