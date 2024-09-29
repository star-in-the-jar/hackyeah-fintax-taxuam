import Chat from "@/components/chat";
import DocumentFormPreview from "@/components/document/FormPreview";
import { StateManagerContext, useCreateStateManager } from "@/state";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FormDisplay, NewForm, pcc3 } from "../form/PCC3";
import { download, renderXML } from "../form/xmlRender";
import { constants } from "@/constants";
import IndexTree from "../IndexTree/IndexTree";
import { Button, buttonVariants } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import DocumentTabs from "@/components/document/Tabs";
import { Message } from "@/types";
import { useChat } from "@/hooks/useChat";
import ChatMessageBubble from "@/components/chat/MessageBubble";
import Loader from "@/components/ui/loader";
import ChatInput from "@/components/chat/Input";

interface TabContentProps {
  formData: NewForm;
  onChange: (formData: NewForm) => void;
  isSelected?: boolean;
}

const TabFormContent = ({
  formData,
  onChange,
  isSelected,
}: TabContentProps) => {
  const { id } = useParams();

  return (
    <div
      className={[
        "space-y-4 grid grid-cols-2 items-start",
        isSelected ? "block" : "hidden",
      ].join(" ")}
    >
      <div>
        <FormDisplay
          formData={formData}
          onChange={(e) => {
            onChange(e);
          }}
          key={id}
        />
      </div>
      <div className="sticky top-16">
        <div className="mb-10">
          <IndexTree formData={formData} />
        </div>
        <Button
          disabled
          onClick={() => {
            download(renderXML(formData), "file.xml");
          }}
          className="ml-2 w-full"
        >
          EXPORT XML
        </Button>
      </div>
    </div>
  );
};

const TabChatContent = ({
  isSelected,
}: Pick<TabContentProps, "isSelected">) => {
  const [documentChatMessages, setDocumentChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Cześć, jestem ${constants.CHAT_NAME} 👋 Jak mogę ci pomóc?`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage } = useChat();

  const formRef = useRef<HTMLDivElement>(null);

  const onSend = async (value: string) => {
    const obj = {
      role: "user",
      content: value,
    } as Message;

    setDocumentChatMessages([...documentChatMessages, obj]);

    setIsLoading(true);
    const res = await sendMessage(documentChatMessages, (text) => {
      setDocumentChatMessages([
        ...documentChatMessages,
        obj,
        {
          role: "user",
          content: text,
        },
      ]);
    });
    setIsLoading(false);

    setDocumentChatMessages([...documentChatMessages, obj, res]);

    if (formRef.current) {
      formRef.current.scrollTop = formRef.current.scrollHeight;
    }
  };

  return (
    <div
      className={[
        "w-full flex-col flex-grow h-full",
        isSelected ? "flex" : "hidden",
      ].join(" ")}
    >
      <div className="overflow-y-auto pb-10" ref={formRef}>
        {documentChatMessages?.map((message, messageIdx) => {
          return <ChatMessageBubble key={messageIdx} message={message} />;
        })}
        {isLoading ? <Loader /> : null}
      </div>
      <div className="mt-auto">
        <ChatInput isLoading={isLoading} onSend={onSend} />
      </div>
    </div>
  );
};

const DocumentChatContent = () => {
  const [formData, setFormData] = useState<NewForm>(() => pcc3);
  const { id } = useParams();

  const [selected, setSelected] = useState<"chat" | "form">("form");

  return (
    <>
      <div className="mb-4">
        <DocumentTabs onChange={(newTab) => setSelected(newTab)} />
      </div>

      <Chat title={id} formData={formData}>
        <TabFormContent
          isSelected={selected === "form"}
          formData={formData}
          onChange={(e) => {
            setFormData(e);
          }}
        />
        <TabChatContent isSelected={selected === "chat"} />
      </Chat>
    </>
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
