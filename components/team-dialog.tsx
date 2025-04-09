import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Profile } from "@/profile-data"
import { Button } from "@/components/ui/button"
import React from 'react';
import Link from "next/link"


interface TeamDialogProps {
    members: Profile[]
}

const TeamDialog: React.FC<TeamDialogProps> = ({members}) => {
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">My Team</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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