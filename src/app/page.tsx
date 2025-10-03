"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eraser, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export interface Task {
    note: string;
    priority: string;
    tag: string;
}

export default function Home() {

    const [task, setTask] = useState<Task[]>([]);

    const [showform, setShowform] = useState(false);
    const [note, setNote] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [tag, setTag] = useState("All");

    const prio = ["Low", "Medium", "High"]
    const hash = ["All", "Work", "Productivity", "Games", "Movies", "Workout", "Lifestyle"]

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const query = searchParams.get("query")?.toLowerCase() || "";


    useEffect(() => {
        const read = JSON.parse(localStorage.getItem("task") || "[]");
        setTask(read);
    }, [])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const newTask = ({ note, priority, tag });
        const update = [...task, newTask];
        setTask(update);
        localStorage.setItem("task", JSON.stringify(update));
        setShowform(!showform);
    }

    function handleClear() {
        localStorage.removeItem("task");
        setTask([]);
    }

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        }
        else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
        console.log(term);
    }

    const filtered = task.filter((f) => f.note.toLowerCase().includes(query) || f.tag.toLowerCase().includes(query));

    return (
        <div className="max-w-3xl mx-auto flex flex-col mt-30 gap-13">
            <h1 className="text-5xl font-semibold">Minimalist To-Do List</h1>
            <div className="flex gap-5">
                <Suspense fallback={<p>Loading tasks...</p>}>
                    <Input placeholder="Search a task..." onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get("query")?.toString()} />
                    <Button variant="default" onClick={() => setShowform(!showform)}><Plus />Add Task</Button>
                    {showform && (
                        <form className=" absolute mt-13 rounded-lg h-fit size-2 w-3xl p-5 flex flex-col gap-5 bg-card border-2 border-border">
                            <Textarea placeholder="I should watch the new Monster: Ed Gein..." onChange={(e) => setNote(e.target.value)} />
                            <div className="flex justify-between">
                                <div className="flex gap-5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="h-9 border-2 px-5 rounded-md text-sm">{tag || "All"}</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Choose a tag</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {hash.map((h, i) => {
                                                return (
                                                    <div key={i}>
                                                        <DropdownMenuItem onSelect={(e) => setTag(h)}>{h}</DropdownMenuItem>
                                                    </div>
                                                )
                                            })}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="h-9 border-2 px-5 rounded-md text-sm">{priority || "Medium"}</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Choose a priority</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {prio.map((p, i) => {
                                                return (
                                                    <div key={i}>
                                                        <DropdownMenuItem onSelect={(e) => setPriority(p)}>{p}</DropdownMenuItem>
                                                    </div>
                                                )
                                            })}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <Button type="submit" onClick={handleSubmit}>Confirm</Button>
                            </div>
                        </form>
                    )}
                    <Button variant="destructive" onClick={handleClear}><Eraser />Clear Task</Button>
                </Suspense>
            </div>
            <div className="flex flex-col gap-5">
                <h3 className="text-xl font-semibold">Current tasks</h3>
                {filtered.map((t, i) => {
                    return (
                        <div key={i} className="p-5 rounded-lg border-border border-2 bg-card w-full flex flex-col gap-1">
                            <p className="text-sm">{t.note}</p>
                            <p className="text-xs text-primary">{t.tag}</p>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col gap-5">
                <h3 className="text-xl font-semibold">Tasks completed</h3>
            </div>
        </div>
    )
}