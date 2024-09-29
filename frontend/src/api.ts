import { Message } from "@/types";

let endpointBase = "";
// endpointBase = "http://localhost:8000";

export type ChatFetchCompletion = {
  elements: Message[];
  declaration?: string,
  field?: string
};

export const fetchChatCompletion = async (
  data: ChatFetchCompletion
): Promise<Message> => {
  const res = await fetch(endpointBase + "/chat-complete", {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const content = await res.json();
  return content;
};

export const fetchChatStream = async (
  data: ChatFetchCompletion,
  onNewData: (totalText: string) => void | Promise<void>
): Promise<Message> => {
  const res = await fetch(endpointBase + "/chat-complete-stream", {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const stream = res.body?.pipeThrough(new TextDecoderStream());
  let sum = "";
  for await (const part of stream as any) {
    sum += part;
    await onNewData(sum);
  }
  return {
    role: "assistant",
    content: sum,
  };
};
