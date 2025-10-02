"use client"

import { useState } from "react"
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AddTask() {

    const [showForm, setShowForm] = useState(false);
    const [note, setNote] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [tag, setTag] = useState("All")

    const prio = ["Low", "Medium", "High"];
    const keyword = ["All", "Productivity", "Games", "Night", "Work", "Chill"]

    function handleSubmit(e: any) {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem("task") || "[]");
        data.push({ note: note, level: priority, tag: tag });
        localStorage.setItem("task", JSON.stringify(data));
        window.dispatchEvent(new Event("tasksUpdated"));
        setShowForm(!showForm);
    }

    return (
        <div>
            <Button onClick={() => setShowForm(!showForm)}><Plus />New task</Button>
            {showForm && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <Textarea value={note} onChange={(e) => setNote(e.target.value)}></Textarea>
                        <DropdownMenu>
                            <DropdownMenuTrigger>{priority || "Urgency"}</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Define the urgency level</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {prio.map((level) => {
                                    return (
                                        <DropdownMenuItem key={level} onSelect={() => setPriority(level)}>{level}</DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger>{tag || "Tag"}</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Choose a tag</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {keyword.map((tag) => {
                                    return (
                                        <DropdownMenuItem key={tag} onSelect={() => setTag(tag)}>{tag}</DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button type="submit">Confirm</Button>
                    </form>
                </div>
            )}
        </div>
    )
}