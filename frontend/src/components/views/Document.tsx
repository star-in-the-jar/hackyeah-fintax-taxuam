import Chat from "@/components/chat";
import ChatInput from "@/components/chat/Input";
import ChatMessageBubble from "@/components/chat/MessageBubble";
import DocumentFormPreview from "@/components/document/FormPreview";
import DocumentTabs from "@/components/document/Tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { constants } from "@/constants";
import { useChat } from "@/hooks/useChat";
import { StateManagerContext, useCreateStateManager } from "@/state";
import { Message } from "@/types";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { FormDisplay, NewForm, pcc3 } from "../form/PCC3";
import { download, renderXML } from "../form/xmlRender";
import IndexTree from "../IndexTree/IndexTree";

interface TabContentProps {
  formData: NewForm;
  onChange: (formData: NewForm) => void;
  isSelected?: boolean;
  onGoAi: (message: Message) => void
}

const TabFormContent = ({
  formData,
  onChange,
  onGoAi,
  isSelected,
}: TabContentProps) => {
  const { id } = useParams();

  return (
    <div
      className={[
        "space-y-4 grid md:grid-cols-2 grid-cols-1 gap-x-4 items-start",
        isSelected ? "block" : "hidden",
      ].join(" ")}
    >
      <div>
        <FormDisplay
          formData={formData}
          goAi={(msg) => {
            onGoAi(msg)
          }}
          onChange={(e) => {
            onChange(e);
          }}
          key={id}
        />
      </div>
      <div className="sticky top-4 hidden md:block">
        <div className="mb-10">
          <IndexTree formData={formData} />
        </div>
        <div className="flex flex-row flex-nowrap">
          <Button
            onClick={() => {
              download(renderXML(formData), "file.xml");
            }}
            className="ml-2 w-full mb-2"
          >
            EXPORT XML
          </Button>
          <a
            href="https://klient-eformularz.mf.gov.pl/declaration/form/422f3471-b5cb-4f25-9f81-2f43c497ec51"
            target="_blank"
            className={[
              "ml-2 w-full",
              buttonVariants({ variant: "secondary" })
            ].join(" ")}
          >
            IMPORT XML
          </a>
        </div>
      </div>
    </div>
  );
};

const TabChatContent = ({
  isSelected,
  messageToAppend
}: {
  isSelected: boolean,
  messageToAppend?: Message | undefined
}) => {
  const [documentChatMessages, setDocumentChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Cześć, jestem ${constants.CHAT_NAME} 👋 Jak mogę ci pomóc?`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage } = useChat({
    declaration: "PCC-3"
  });


  const [ref, setRef] = useState<HTMLElement | null>(null);

  const handleScroll = (force = false) => {
    if (!ref) return

    const isNearBottom = () => {
      const threshold = 150;
      const position = ref.scrollTop + ref.offsetHeight;
      const height = ref.scrollHeight;
      return position > height - threshold;
    }

    if (isNearBottom() || force) {
      ref.scroll({
        top: ref.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  const onSend = async (value: string) => {
    const obj = {
      role: "user",
      content: value,
    } as Message;

    handleScroll()
    setDocumentChatMessages([...documentChatMessages, obj]);
    handleScroll(true)

    setIsLoading(true);
    const res = await sendMessage([...documentChatMessages, obj], (text) => {
      setDocumentChatMessages([
        ...documentChatMessages,
        obj,
        {
          role: "assistant",
          content: text,
        },
      ]);
      handleScroll(true)
    });
    setIsLoading(false);

    setDocumentChatMessages([...documentChatMessages, obj, res]);

    handleScroll()
  };


  useEffect(() => {
    if (messageToAppend) {
      onSend(messageToAppend.content)
    }
  }, [messageToAppend])

  return (
    <div
      className={[
        "w-full flex-col flex-grow h-full",
        isSelected ? "flex" : "hidden",
      ].join(" ")}
    >
      <div className="overflow-y-auto pb-10" ref={setRef}>
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
  const [messageToAppend, setMessageToAppend] = useState<Message | undefined>(undefined)
  return (
    <>
      <div className="mb-4">
        <DocumentTabs
          selected={selected}
          onChange={(newTab) => setSelected(newTab)} />
      </div>

      <Chat title={id} formData={formData}>
        <TabFormContent
          onGoAi={(msg) => {
            setSelected("chat")
            setMessageToAppend(msg)
          }}
          isSelected={selected === "form"}
          formData={formData}
          onChange={(e) => {
            setFormData(e);
          }}
        />
        <TabChatContent
          messageToAppend={messageToAppend}
          isSelected={selected === "chat"} />
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
