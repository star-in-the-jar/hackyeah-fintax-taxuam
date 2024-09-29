import { constants } from "@/constants";
import type { Message } from "@/types";
import Markdown from 'react-markdown'



interface MessageProps {
  message: Message;
}
const MessageBubble = (props: MessageProps) => {
  const commonClassNames = "p-4 max-w-lg w-full";
  if (props.message.role === "system") return <></>;

  if (props.message.role === "assistant")
    return (
      <div className={[commonClassNames].join(" ")}>
        <h5 className=" text-primary/70 font-medium">{constants.CHAT_NAME}</h5>
        <div className="markdown-base"><Markdown>{props.message.content}</Markdown></div>
      </div>
    );

  return (
    <div
      className={[
        commonClassNames,
        "text-white bg-primary rounded-lg ml-auto",
      ].join(" ")}
    >
      <h5 className="font-medium">Ty</h5>
      <div>{props.message.content}</div>
    </div>
  );
};

export default MessageBubble;
