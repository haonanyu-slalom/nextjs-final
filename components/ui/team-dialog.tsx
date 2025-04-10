"use client"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { Profile } from "@/profile-data"
import { Button } from "@/components/ui/button"
import React from 'react';
import Link from "next/link"
import { X } from "lucide-react"


interface TeamDialogProps {
    members: Profile[];
    onRemoveMember: (memberId: number) => void;
}

const TeamDialog: React.FC<TeamDialogProps> = ({members, onRemoveMember}) => {
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">My Team</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>My Team</DialogTitle>
                <DialogDescription>Add your desired developers here</DialogDescription>
            </DialogHeader>
            {
                members.map((member) => (
                    <div className="flex items-center justify-between hover:bg-gray-50 rounded-md p-2" key={member.id}>
                        <Link
                            href={`/profile/${member.id}`}
                            className="black underline"
                        >
                            {member.name}
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveMember(member.id)}
                            aria-label="Remove member"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))
            }
        </DialogContent>
    </Dialog>
    )
};

export default TeamDialog;
