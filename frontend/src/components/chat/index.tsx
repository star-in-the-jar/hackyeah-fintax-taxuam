import { ReactNode, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { NewForm } from "../form/PCC3";

interface ChatProps {
  title?: string;
  children?: ReactNode;
  formData?: NewForm;
}

const fieldsToIgnoreCount = ["rodzajAdresu", "KodKraju"];

const Chat = (props: ChatProps) => {
  const [totalCounter, setTotalCounter] = useState(0);
  const [completedCounter, setCompletedCounter] = useState(0);
  const computeProgressByFieldValues = (
    ref: string | Record<PropertyKey, unknown>
  ) => {
    if (typeof ref === "string") {
      setTotalCounter((prev) => prev + 1);
      if (ref !== "") setCompletedCounter((prev) => prev + 1);
    } else {
      Object.entries(ref).forEach(([key, value]) => {
        if (fieldsToIgnoreCount.includes(key)) return;
        computeProgressByFieldValues(value);
      });
    }
  };

  useEffect(() => {
    if (!props.formData) return;
    setTotalCounter(0);
    setCompletedCounter(0);

    computeProgressByFieldValues(props.formData);
  }, [props.formData]);

  const getProgressPercentage = () => {
    if (totalCounter === 0) return null;
    const percentageProgress = (completedCounter / totalCounter) * 100;
    const roundedProgress = Math.min(100, percentageProgress);
    return Math.max(0, roundedProgress);
  };

  const getReadableProgress = () => {
    if (totalCounter === 0) return null;
    return (
      <>
        Wypełniono <span className="font-semibold">{completedCounter}</span> z{" "}
        <span className="font-semibold">{totalCounter}</span> pól
      </>
    );
  };

  const DEFAULT_CHAT_TITLE = "Chat";
  return (
    <div className="border w-full min-h-[490px] rounded-md p-4 flex flex-col h-full">
      <div className="mb-5">
        <h3 className="text-2xl mb-2 text-center">
          {props.title || DEFAULT_CHAT_TITLE}
        </h3>

        {totalCounter !== 0 ? (
          <div className="max-w-sm w-full mx-auto text-zinc-600/70">
            <h5 className="text-sm mb-2 text-center">
              {getReadableProgress()}
            </h5>
            <Progress value={getProgressPercentage()} />
          </div>
        ) : null}
      </div>

      <div className="flex flex-col flex-grow overflow-y-scroll mb-5">
        <div className="px-2 h-full space-y-5">{props.children}</div>
      </div>
    </div>
  );
};

export default Chat;
