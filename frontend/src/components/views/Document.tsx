import Chat from "@/components/chat";
import ChatMessageBubble from "@/components/chat/MessageBubble";
import { StateManagerContext, useCreateStateManager } from "@/state";
import { useParams } from "react-router-dom";

const Document = () => {
  const { id } = useParams();
  const manager = useCreateStateManager()

  return (
    <StateManagerContext.Provider value={manager}>
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
    </StateManagerContext.Provider>
  );
};

export default Document;
