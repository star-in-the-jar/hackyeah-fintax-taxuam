import { Field } from "@/state";
import ChatInput from "./Input";

interface QuestionTileProps {
  field: Field;
}

const QuestionTile = (props: QuestionTileProps) => {
  const onSend = (value: string) => {
    console.log(value);
  };
  return (
    <div className="border p-4 rounded-lg mb-4">
      <p className="mb-1">
        Wartość klucza <span className="font-medium">{props.field.key}</span>
      </p>
      <ChatInput onSend={onSend} buttonText="Zapisz" />
    </div>
  );
};

export default QuestionTile;
