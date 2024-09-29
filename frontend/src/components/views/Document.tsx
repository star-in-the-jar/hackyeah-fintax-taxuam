import Chat from "@/components/chat";
import DocumentFormPreview from "@/components/document/FormPreview";
import { StateManagerContext, useCreateStateManager } from "@/state";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FormDisplay, NewForm, pcc3 } from "../form/implement";
import { download, renderXML } from "../form/xmlRender";
import { constants } from "@/constants";
import { Button } from "@/components/ui/button";

const DocumentChatContent = () => {
  const [formData, setFormData] = useState<NewForm>(() => pcc3);
  const { id } = useParams();

  // TODO: POTEM PODPIAC
  const [samplePart, setSamplePart] = useState({
    totalStepsAmount: 27,
    completedStepsAmount: 2,
  });

  return (
    <Chat title={id} partDetails={samplePart}>
      <div className="space-y-4">
        <FormDisplay
          formData={formData}
          onChange={(e) => {
            setFormData(e);
          }}
          key={id}
        />
        <div className="flex justify-center">
          <button
            onClick={() => {
              download(renderXML(formData), "file.xml");
            }}
          >
            <Button>EXPORT XML</Button>
          </button>
        </div>
      </div>
    </Chat>
  );
};

const Document = () => {
  const manager = useCreateStateManager();

  return (
    <StateManagerContext.Provider value={manager}>
      <div className="container mx-auto max-w-3xl w-full py-10 px-4 lg:px-0 h-screen flex flex-col">
        <div className="flex gap-x-4 items-center justify-center mb-8">
          <img
            className="w-10"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Herb_Polski.svg/204px-Herb_Polski.svg.png"
          />
          <h1 className="text-4xl text-center text-primary font-medium">
            {constants.CHAT_NAME}
          </h1>
        </div>
        <DocumentChatContent />

        <DocumentFormPreview />
      </div>
    </StateManagerContext.Provider>
  );
};

export default Document;
