import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TabsProps {
  onChange: (selected: "form" | "chat") => void;
}

const DocumentTabs = ({ onChange }: TabsProps) => {
  const [selected, setSelected] = useState<"form" | "chat">("form");

  const handleOnChange = (newSelected: "form" | "chat") => {
    if (newSelected === selected) return;

    setSelected(newSelected);
    onChange(newSelected);
  };
  return (
    <div className="grid grid-cols-2 sticky top-0 z-10 bg-white">
      <Button
        onClick={() => handleOnChange("form")}
        variant={selected === "form" ? "default" : "secondary"}
      >
        Formularz
      </Button>
      <Button
        onClick={() => handleOnChange("chat")}
        variant={selected === "chat" ? "default" : "secondary"}
      >
        ✨AI Chat✨
      </Button>
    </div>
  );
};

export default DocumentTabs;
