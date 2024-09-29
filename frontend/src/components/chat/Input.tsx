import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

interface ChatProps {
  onSend: (value: string) => void;
  placeholder?: string;
  buttonText?: string;
  isLoading?: boolean;
}

const ChatInput = (props: ChatProps) => {
  const [messageValue, setMessageValue] = useState("");

  const handleOnSend = () => {
    if (!messageValue || props.isLoading) return;
    props.onSend(messageValue);
    setMessageValue("");
  };

  const memoInputPlaceholder = useMemo(() => {
    if (props.isLoading) return "Przetwarzamy twoją wiadomość...";

    return props.placeholder || "Zadaj mi pytanie...";
  }, [props.isLoading]);

  return (
    <div className="flex gap-x-2 items-center">
      <Input
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        disabled={props.isLoading}
        onKeyUp={(e: KeyboardEvent) => {
          if (e.key === "Enter") {
            handleOnSend();
          }
        }}
        placeholder={memoInputPlaceholder}
      />
      <Button
        disabled={props.isLoading}
        variant="outline"
        onClick={handleOnSend}
      >
        {props.buttonText || "Send"}
      </Button>
    </div>
  );
};

export default ChatInput;
