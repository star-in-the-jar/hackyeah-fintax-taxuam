import DocumentButtonOptions from "@/components/document/ButtonOptions";
import Chat from "@/components/chat";
import ChatInput from "@/components/chat/Input";
import ChatMessageBubble from "@/components/chat/MessageBubble";
import { useState } from "react";
import type { Message } from "@/types";
import { useChat } from "@/hooks/useChat";
import Loader from "@/components/ui/loader";
import { constants } from "@/constants";

const HomeChatContent = () => {
  const [homeChatMessages, setHomeChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Cześć, jestem ${constants.CHAT_NAME} 👋 Jak mogę ci pomóć?`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage } = useChat();

  const onSend = async (value: string) => {
    const obj = {
      role: "user",
      content: value,
    } as Message;

    setHomeChatMessages([...homeChatMessages, obj]);

    setIsLoading(true);
    const res = await sendMessage(homeChatMessages);
    setIsLoading(false);

    setHomeChatMessages([...homeChatMessages, obj, res]);
  };

  return (
    <Chat>
      <div className="w-full flex flex-col h-full">
        {homeChatMessages?.map((message, messageIdx) => {
          return <ChatMessageBubble key={messageIdx} message={message} />;
        })}
        {isLoading ? <Loader /> : null}
        <div className="mt-auto">
          <ChatInput isLoading={isLoading} onSend={onSend} />
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
