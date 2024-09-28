import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatInput = () => {
  return (
    <div className="flex gap-x-2 items-center">
      <Input placeholder="Czym jest PESEL?" />
      <Button variant="outline">Send</Button>
    </div>
  );
};

export default ChatInput;
