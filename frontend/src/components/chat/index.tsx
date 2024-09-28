import { ReactNode } from "react";
import { Progress } from "@/components/ui/progress";

interface PartDetails {
  totalStepsAmount: number;
  completedStepsAmount: number;
}

interface ChatProps {
  title?: string;
  children?: ReactNode;
  partDetails?: PartDetails;
}

const Chat = (props: ChatProps) => {
  const getProgressPercentage = () => {
    if (props.partDetails?.completedStepsAmount === undefined) return null;
    const computedProgress =
      (props.partDetails.completedStepsAmount /
        props.partDetails.totalStepsAmount) *
      100;
    const roundedProgress = Math.min(100, computedProgress);
    return Math.max(0, roundedProgress);
  };

  const getReadableProgress = () => {
    if (!props.partDetails?.totalStepsAmount) return null;
    return (
      <>
        Wypełniono{" "}
        <span className="font-semibold">
          {props.partDetails?.completedStepsAmount}
        </span>{" "}
        z{" "}
        <span className="font-semibold">
          {props.partDetails?.totalStepsAmount}
        </span>{" "}
        pól
      </>
    );
  };

  const DEFAULT_CHAT_TITLE = "Chat";
  return (
    <div className="border w-full min-h-[490px] rounded-md p-4 flex flex-col h-full">
      <div className="mb-10">
        <h3 className="text-2xl mb-2 text-center">
          {props.title || DEFAULT_CHAT_TITLE}
        </h3>

        {props.partDetails?.totalStepsAmount ? (
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
