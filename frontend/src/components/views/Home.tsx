import DocumentButtonOptions from "@/components/document/ButtonOptions";
import Chat from "@/components/chat";
import ChatInput from "@/components/chat/Input";
import ChatMessageBubble from "@/components/chat/MessageBubble";
import { useState } from "react";
import type { Message } from "@/types";

const HomeChatContent = () => {
  const [homeChatMessages, setHomeChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Cześć, jestem Tax Assistant 👋 Jak mogę ci pomóć?",
    },
  ]);

  const onSend = (value: string) => {
    const obj = {
      role: "user",
      content: value,
    } as Message;

    setHomeChatMessages([...homeChatMessages, obj]);
  };

  return (
    <Chat>
      <div className="w-full flex flex-col h-full">
        {homeChatMessages?.map((message) => {
          return <ChatMessageBubble message={message} />;
        })}
        <div className="mt-auto">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </Chat>
  );
};

const Home = () => {
  return (
    <div className="container mx-auto max-w-3xl w-full py-10 px-4 lg:px-0 flex flex-col h-screen">
      <h1 className="text-4xl text-center mb-8">Tax Assistant</h1>

      <div className="mb-4">
        <h3 className="text-2xl mb-2">Wybierz deklarację</h3>
        <DocumentButtonOptions />
      </div>

      <HomeChatContent />
    </div>
  );
};

export default Home;
