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
      <ChatInput
        onSend={onSend}
        placeholder={`Wartość ${props.field.key}`}
        buttonText="Zapisz"
      />
    </div>
  );
};

export default QuestionTile;
