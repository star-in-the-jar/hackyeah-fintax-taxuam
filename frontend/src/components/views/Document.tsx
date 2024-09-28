import Chat from "@/components/chat";
import DocumentFormPreview from "@/components/document/FormPreview";
import {
  StateManagerContext,
  useCreateStateManager
} from "@/state";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FormDisplay, NewForm, pcc3 } from "../form/implement";

const DocumentChatContent = () => {
  const [formData, setFormData] = useState<NewForm>(() => pcc3)
  const { id } = useParams();

  // TODO: POTEM PODPIAC
  const [samplePart, setSamplePart] = useState({
    totalStepsAmount: 27,
    completedStepsAmount: 2,
  });

  return (
    <Chat title={id} partDetails={samplePart}>
      <div className="space-y-4">
        <FormDisplay formData={formData} onChange={(e) => {
          setFormData(e)
        }} key={id} />
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
