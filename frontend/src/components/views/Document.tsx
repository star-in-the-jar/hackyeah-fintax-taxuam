import Chat from "@/components/chat";
import {
  StateManagerContext,
  useCreateStateManager,
  useStateManager,
} from "@/state";
import { useParams } from "react-router-dom";
import ChatMessageGroup from "@/components/chat/MessageGroup";
import DocumentFormPreview from "@/components/document/FormPreview";

const DocumentChatContent = () => {
  const { state } = useStateManager();

  return (
    <div className="space-y-4">
      {state.messages.map((iteratedField) => {
        return (
          <ChatMessageGroup
            key={iteratedField.key}
            field={iteratedField}
          ></ChatMessageGroup>
        );
      })}
    </div>
  );
};

const Document = () => {
  const { id } = useParams();
  const manager = useCreateStateManager();

  return (
    <StateManagerContext.Provider value={manager}>
      <div className="container mx-auto max-w-3xl w-full py-10 px-4 lg:px-0 h-screen flex flex-col">
        <Chat title={id}>
          <DocumentChatContent />
        </Chat>

        <DocumentFormPreview />
      </div>
    </StateManagerContext.Provider>
  );
};

export default Document;
