import Chat from "@/components/chat";
import DocumentFormPreview from "@/components/document/FormPreview";
import { StateManagerContext, useCreateStateManager } from "@/state";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FormDisplay, NewForm, pcc3 } from "../form/PCC3";
import { download, renderXML } from "../form/xmlRender";
import { constants } from "@/constants";
import IndexTree from "../IndexTree/IndexTree";
import { buttonVariants } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";

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
      <div className="space-y-4 flex justify-between gap-5">
        <div>
          <FormDisplay
            formData={formData}
            onChange={(e) => {
              setFormData(e);
            }}
            key={id}
          />
          <button
            onClick={() => {
              download(renderXML(formData), "file.xml");
            }}
          >
            EXPORT XML
          </button>
        </div>
        <div className="sticky top-0 h-full overflow-y-auto">
            <IndexTree />
          </div>
      </div>
    </Chat>
  );
};

const Document = () => {
  const manager = useCreateStateManager();

  return (
    <StateManagerContext.Provider value={manager}>
      <div className="container mx-auto max-w-4xl w-full py-10 px-4 lg:px-0 h-screen flex flex-col">
        <div className="grid grid-cols-3 gap-x-2 items-center mb-8 ">
          <div className="col-span-1">
            <Link
              className={[
                buttonVariants({ variant: "link" }),
                "inline-flex gap-x-2 items-center",
              ].join(" ")}
              to="/"
            >
              <FaArrowLeftLong />
              Wróć do wyboru wniosku
            </Link>
          </div>
          <div className="inline-flex gap-x-4 items-center justify-center col-span-1">
            <img
              className="w-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Herb_Polski.svg/204px-Herb_Polski.svg.png"
            />
            <h1 className="text-4xl text-center text-primary font-medium">
              {constants.CHAT_NAME}
            </h1>
          </div>
          <div className="col-span-1"></div>
        </div>
        <DocumentChatContent />

        <DocumentFormPreview />
      </div>
    </StateManagerContext.Provider>
  );
};

export default Document;
