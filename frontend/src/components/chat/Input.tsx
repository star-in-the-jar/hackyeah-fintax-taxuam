import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ChatProps {
  onSend: (value: string) => void;
}

const ChatInput = (props: ChatProps) => {
  const [messageValue, setMessageValue] = useState("");

  const handleOnSend = () => {
    if (!messageValue) return;
    props.onSend(messageValue);
    setMessageValue("");
  };

  return (
    <div className="flex gap-x-2 items-center">
      <Input
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        onKeyUp={(e: KeyboardEvent) => {
          if (e.key === "Enter") {
            handleOnSend();
          }
        }}
        placeholder="Czym jest PESEL?"
      />
      <Button variant="outline" onClick={handleOnSend}>
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
