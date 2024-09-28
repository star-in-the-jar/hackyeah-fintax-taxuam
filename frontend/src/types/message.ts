export interface Message {
  role: "system" | "assistant" | "user";
  content: string;
}

export interface History {
  messages: Message[];
}
