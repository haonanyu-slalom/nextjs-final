import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { techStacks, experienceLevel, availability } from "@/profile-data";
import { ChevronDown } from "lucide-react";

interface MultiSelectDropdownProps {
  title: string;
  selectedOptions: string[];
  onSelectChange: (options: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  title,
  selectedOptions,
  onSelectChange,
}) => {
  const [open, setOpen] = useState(false);
  const options = title.includes("Experience Level")
    ? experienceLevel
    : title.includes("Tech Stack")
    ? techStacks
    : availability;

  const toggleSelection = (option: string) => {
    const updatedSelections = selectedOptions.includes(option)
      ? selectedOptions.filter((op) => op !== option) // Fixed here
      : [...selectedOptions, option];
    onSelectChange(updatedSelections);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center justify-between">
          {title}
          <ChevronDown size={16} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        {options.map((option) => (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              toggleSelection(option);
            }}
            key={option}
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => toggleSelection(option)}
            />
            <span className="ml-2">{option}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelectDropdown;
