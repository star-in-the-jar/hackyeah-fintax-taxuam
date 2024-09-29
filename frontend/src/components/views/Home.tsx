import Chat from "@/components/chat";
import ChatInput from "@/components/chat/Input";
import ChatMessageBubble from "@/components/chat/MessageBubble";
import DocumentButtonOptions from "@/components/document/ButtonOptions";
import Loader from "@/components/ui/loader";
import { constants } from "@/constants";
import { useChat } from "@/hooks/useChat";
import type { Message } from "@/types";
import { useState } from "react";

const HomeChatContent = () => {
  const [homeChatMessages, setHomeChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Cześć, jestem ${constants.CHAT_NAME} 👋 Jak mogę ci pomóc?`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage } = useChat();

  const [ref, setRef] = useState<HTMLElement | null>(null);

  const handleScroll = (force = false) => {
    if (!ref) return

    const isNearBottom = () => {
      const threshold = 150;
      const position = ref.scrollTop + ref.offsetHeight;
      const height = ref.scrollHeight;
      return position > height - threshold;
    }

    if (isNearBottom() || force) {
      ref.scroll({
        top: ref.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  const onSend = async (value: string) => {
    const obj = {
      role: "user",
      content: value,
    } as Message;

    handleScroll(true)
    setHomeChatMessages([...homeChatMessages, obj]);

    setIsLoading(true);
    const res = await sendMessage([...homeChatMessages, obj], (text) => {
      setHomeChatMessages([
        ...homeChatMessages,
        obj,
        {
          role: "assistant",
          content: text,
        },
      ]);
      handleScroll(true)
    });
    setIsLoading(false);

    setHomeChatMessages([...homeChatMessages, obj, res]);
    handleScroll(true)
  };

  return (
    <Chat>
      <div className="w-full flex flex-col h-full">
        <div ref={setRef} className="pb-10 overflow-y-auto">
          {homeChatMessages?.map((message, messageIdx) => {
            return <ChatMessageBubble key={messageIdx} message={message} />;
          })}
          {isLoading ? <Loader /> : null}
        </div>
        <div className="mt-auto">
          <ChatInput isLoading={isLoading} onSend={onSend} />
        </div>
      </div>
    </Chat>
  );
};

const Home = () => {
  return (
    <div className="container mx-auto max-w-4xl w-full py-10 px-4 lg:px-0 flex flex-col h-screen">
      <div className="flex gap-x-4 items-center justify-center mb-8">
        <img
          className="w-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Herb_Polski.svg/204px-Herb_Polski.svg.png"
        />
        <h1 className="text-4xl text-center text-primary font-medium">
          {constants.CHAT_NAME}
        </h1>
      </div>

      <div className="mb-4">
        <h3 className="text-2xl mb-2">Wybierz deklarację</h3>
        <DocumentButtonOptions />
      </div>

      <HomeChatContent />
    </div>
  );
};

export default Home;
