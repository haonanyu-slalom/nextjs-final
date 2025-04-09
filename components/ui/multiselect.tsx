import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import React, { useState } from 'react';
import { techStacks, experienceLevel, availability } from "@/profile-data";

interface MultiSelectDropdownProps {
    title: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({title}) => { 
    const [open, setOpen] = useState(false)
    const options = title === 'Experience Level' 
        ? experienceLevel 
        : (title === 'Tech Stack' ? techStacks : availability);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    const toggleSelection = (option: string) => {
        setSelectedOptions((currentSelections) => 
            currentSelections.includes(option) 
                ? currentSelections.filter((item) => item != option)
                : [...currentSelections, option]
        );
        console.log(options)
    };
    
    return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild>
    <Button variant="outline">{title}</Button>
    </DropdownMenuTrigger>
    
      <DropdownMenuContent className="w-56">    
       {
        options.map((option) => (
            <DropdownMenuItem
                onSelect={(e) => {
                    e.preventDefault()
                    toggleSelection(option)
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
        ))
       }
      </DropdownMenuContent>
    </DropdownMenu>
    )
}
    
export default MultiSelectDropdown;
