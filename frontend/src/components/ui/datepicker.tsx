"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  onSelect: (date: Date) => void;
  value?: string;
}

const DatePicker = (props: Props) => {
  const handleChange = (newValue: Date) => {
    setDate(newValue);
    props.onSelect(newValue);
  };
  const [date, setDate] = React.useState<Date>(
    () => new Date()
  );

  return (
    <Popover>
      <PopoverTrigger asChild className={[cn(
        "w-full justify-start text-left font-normal",
        !date && "text-muted-foreground"
      ), buttonVariants({ variant: "outline" })].join(" ")}>

        <div>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
