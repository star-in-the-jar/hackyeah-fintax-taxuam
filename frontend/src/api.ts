import { Message } from "@/types";

let endpointBase = "";

endpointBase = "http://localhost:8000"

export type ChatFetchCompletion = {
  elements: Message[];
};

export const fetchChatCompletion = async (
  data: ChatFetchCompletion
): Promise<Message> => {
  const res = await fetch(endpointBase + "/chat-complete", {
    method: "post",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json"
    }
  });

  const content = await res.json();
  return content;
};
