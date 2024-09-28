import { Message } from "@/types";

export const useChat = () => {
  const sendMessage = async (messages: Message[]): Promise<Message> => {
    // PRZEMEK JEBNIJ TO POTEM
    // const response = await fetch('http://localhost:3001/messages', {

    return new Promise<Message>((resolve) => {
      setTimeout(() => {
        resolve({
          role: "assistant",
          content: "Response from the server",
        } as Message);
      }, 2000);
    });
  };

  return {
    sendMessage,
  };
};
