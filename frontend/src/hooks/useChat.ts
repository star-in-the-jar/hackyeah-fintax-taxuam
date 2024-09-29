import { fetchChatStream } from "@/api";
import { Message } from "@/types";

export const useChat = () => {
  const sendMessage = async (
    messages: Message[],
    cb: (text: string) => void
  ): Promise<Message> => {
    // PRZEMEK JEBNIJ TO POTEM
    // const response = await fetch('http://localhost:3001/messages',

    if (!cb) throw new Error("NIE DZIALA");
    return fetchChatStream(
      {
        elements: messages,
      },
      cb
    );
  };

  return {
    sendMessage,
  };
};
