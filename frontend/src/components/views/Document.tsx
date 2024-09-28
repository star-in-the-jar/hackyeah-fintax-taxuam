import Chat from "@/components/chat";
import {
  StateManagerContext,
  useCreateStateManager,
  useStateManager,
} from "@/state";
import { useParams } from "react-router-dom";
import ChatMessageGroup from "@/components/chat/MessageGroup";
import DocumentFormPreview from "@/components/document/FormPreview";
import { useState } from "react";

const DocumentChatContent = () => {
  const { state } = useStateManager();
  const { id } = useParams();

  // TODO: POTEM PODPIAC
  const [samplePart, setSamplePart] = useState({
    totalStepsAmount: 27,
    completedStepsAmount: 2,
  });

  return (
    <Chat title={id} partDetails={samplePart}>
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
    </Chat>
  );
};

const Document = () => {
  const manager = useCreateStateManager();

  return (
    <StateManagerContext.Provider value={manager}>
      <div className="container mx-auto max-w-3xl w-full py-10 px-4 lg:px-0 h-screen flex flex-col">
        <DocumentChatContent />

        <DocumentFormPreview />
      </div>
    </StateManagerContext.Provider>
  );
};

export default Document;
