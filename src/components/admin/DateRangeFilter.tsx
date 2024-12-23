import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DateRangeFilterProps {
  onRangeChange?: (range: DateRange | undefined) => void;
  defaultRange?: DateRange;
}

const DateRangeFilter = ({
  onRangeChange = () => {},
  defaultRange = {
    from: new Date(2024, 0, 1),
    to: new Date(),
  },
}: DateRangeFilterProps) => {
  const [date, setDate] = React.useState<DateRange | undefined>(defaultRange);

  const handleRangeSelect = (range: DateRange | undefined) => {
    setDate(range);
    onRangeChange(range);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-[#1C1C1E] border-[#2C2C2E] text-white hover:bg-[#2C2C2E] hover:text-white hover:border-[#3C3C3E]"
        onClick={() => {
          const today = new Date();
          const range = { from: today, to: today };
          handleRangeSelect(range);
        }}
      >
        Today
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-[#1C1C1E] border-[#2C2C2E] text-white hover:bg-[#2C2C2E] hover:text-white hover:border-[#3C3C3E]"
        onClick={() => {
          const today = new Date();
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          const range = { from: weekAgo, to: today };
          handleRangeSelect(range);
        }}
      >
        Last 7 Days
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-[#1C1C1E] border-[#2C2C2E] text-white hover:bg-[#2C2C2E] hover:text-white hover:border-[#3C3C3E]"
        onClick={() => {
          const today = new Date();
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          const range = { from: monthAgo, to: today };
          handleRangeSelect(range);
        }}
      >
        Last 30 Days
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal bg-[#1C1C1E] border-[#2C2C2E] text-white hover:bg-[#2C2C2E] hover:text-white hover:border-[#3C3C3E]",
              !date && "text-[#8E8E93]",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-[#1C1C1E] border-[#2C2C2E]"
          align="end"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleRangeSelect}
            numberOfMonths={2}
            className="bg-[#1C1C1E] text-white [&_.rdp-day]:text-white [&_.rdp-day_button:hover]:bg-[#2C2C2E] [&_.rdp-day_button:focus]:bg-[#2C2C2E] [&_.rdp-day.rdp-day_selected]:bg-[#007AFF] [&_.rdp-day.rdp-day_selected]:text-white [&_.rdp-head_cell]:text-[#8E8E93]"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;
