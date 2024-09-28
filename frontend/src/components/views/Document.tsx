import Chat from "@/components/chat";
import { useParams } from "react-router-dom";
import ChatMessageGroup from "@/components/chat/MessageGroup";

const Document = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto max-w-3xl w-full py-10 px-4 lg:px-0 h-screen flex flex-col">
      <Chat title={id}>
        <ChatMessageGroup></ChatMessageGroup>
      </Chat>
    </div>
  );
};

export default Document;
