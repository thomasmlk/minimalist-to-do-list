"use client"

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from "@/utils/types";

export default function AddTask({ onSubmit }: { onSubmit: (subTask: Task) => void }) {

    const [showform, setShowform] = useState(false);
    const [note, setNote] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [tag, setTag] = useState("All");

    const prio = ["Low", "Medium", "High"];
    const hashtag = ["All", "Productivity", "Work", "Games", "Workout", "Kitchen", "Chill"]

    function handleSubmit() {
        const subTask = { note, priority, tag, state: false };
        onSubmit(subTask);
        setNote("");
        setPriority("Medium");
        setTag("All");
        setShowform(false);
    }

    return (
        <div>
            <Button variant="default" onClick={() => setShowform(!showform)}><Plus />Add Task</Button>
            {showform && (
                <div className="bg-card border-border border-2 rounded-2xl absolute w-3xl left-1/2 -translate-x-1/2 mt-5 p-5 flex flex-col gap-5">
                    <Textarea className="w-full" placeholder="I should watch a new horror movie this night..." onChange={(e) => (setNote(e.target.value))} />
                    <div className="flex justify-between">
                        <div className="flex gap-5">
                            <div className="h-9 border-border border-2 px-5 flex text-sm rounded-lg">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>{priority || "Priority"}</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {prio.map((p, i) => {
                                            return (
                                                <div key={i}>
                                                    <DropdownMenuItem onSelect={() => (setPriority(p))}>{p}</DropdownMenuItem>
                                                </div>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="h-9 border-border border-2 px-5 flex text-sm rounded-lg">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>{tag || "Tag"}</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {hashtag.map((h, i) => {
                                            return (
                                                <div key={i}>
                                                    <DropdownMenuItem onSelect={() => (setTag(h))}>{h}</DropdownMenuItem>
                                                </div>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <Button value="default" onClick={handleSubmit}><Check />Confirm</Button>
                    </div>
                </div>
            )}
        </div>
    )
}