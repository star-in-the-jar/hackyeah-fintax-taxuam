import type { Message } from "@/types";
interface MessageProps {
  message: Message;
}
const MessageBubble = (props: MessageProps) => {
  const commonClassNames = "p-4 max-w-lg";
  if (props.message.role === "system") return <></>;

  if (props.message.role === "assistant")
    return (
      <div className={[commonClassNames].join(" ")}>
        {props.message.content}
      </div>
    );

  return (
    <div
      className={[
        commonClassNames,
        "text-white bg-zinc-700 rounded-lg ml-auto",
      ].join(" ")}
    >
      {props.message.content}
    </div>
  );
};

export default MessageBubble;
