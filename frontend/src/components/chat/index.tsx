import { ReactNode } from "react";
import ChatInput from "./Input";

interface ChatProps {
  title?: string;
  children?: ReactNode;
}

const Chat = (props: ChatProps) => {
  const DEFAULT_CHAT_TITLE = "Chat";
  return (
    <div className="border w-full min-h-[490px] rounded-md p-4 flex flex-col">
      <h3 className="text-2xl mb-10 text-center">
        {props.title || DEFAULT_CHAT_TITLE}
      </h3>

      <div className=" flex flex-col flex-grow overflow-y-scroll mb-5">
        <div className="px-2 h-full space-y-5">{props.children}</div>
      </div>
      <div className="shrink-0 mt-auto">
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
