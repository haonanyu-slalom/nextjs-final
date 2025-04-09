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


interface TeamDialogProps {
    members: Profile[];
}

const TeamDialog: React.FC<TeamDialogProps> = ({members}) => {
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
                    <Link
                        href={`/profile/${member.id}`}
                        key={member.id}
                        className="black underline"
                    >
                        {member.name}
                    </Link>
                ))
            }
        </DialogContent>
    </Dialog>
    )
};

export default TeamDialog;