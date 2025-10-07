"use client"

import { useEffect, useState } from "react";
import { Task } from "@/utils/types";
import Search from "@/components/search";
import AddTask from "@/components/AddTask";
import ClearTask from "@/components/ClearTask";
import DisplayTask from "@/components/DisplayTask";
import ChangeDisplay from "@/components/ChangeDisplay";

export default function Home() {

    const [task, setTask] = useState<Task[]>([]);
    const [term, setTerm] = useState("");
    const [displayMode, setDisplayMode] = useState<"grid" | "list">("list")

    useEffect(() => {
        const read = JSON.parse(localStorage.getItem("task") || "[]");
        setTask(read);
    }, []);

    useEffect(() => {
        localStorage.setItem("task", JSON.stringify(task));
    }, [task]);

    function handleAdd(newTask: Task) {
        setTask([...task, newTask]);
    }

    function handleClear() {
        localStorage.removeItem("task");
        setTask([]);
    }

    function handleToggle(check: Task) {
        const checked = task.map(t => t === check ? { ...t, state: !t.state } : t)
        setTask(checked);
    }

    function toggleDisplay() {
        setDisplayMode(prev => (prev === "list" ? "grid" : "list"));
    }

    return (
        <div className="max-w-3xl mx-auto mt-30 flex flex-col gap-18">
            <h1 className="text-5xl font-bold">Minimalist To-Do List</h1>
            <div className="flex md:flex-row flex-col gap-5">
                <Search placeholder="Search a task..." onSearch={setTerm} />
                <div className="flex gap-5">
                <AddTask onSubmit={handleAdd} />
                <ClearTask onClear={handleClear} />
                <ChangeDisplay displayMode={displayMode} onClick={toggleDisplay} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <h3 className="text-xl font-semibold">Current tasks</h3>
                <DisplayTask
                    showTask={task
                        .filter((t) => !t.state && (t.note.toLowerCase().includes(term.toLowerCase()) || t.tag.toLowerCase().includes(term.toLowerCase())))
                        .toReversed()
                    }
                    displayMode={displayMode}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col gap-5">
                <h3 className="text-xl font-semibold">Tasks completed</h3>
                <DisplayTask
                    showTask={task
                        .filter((t) => t.state && (t.note.toLowerCase().includes(term.toLowerCase()) || t.tag.toLowerCase().includes(term.toLowerCase())))
                        .toReversed()
                    }
                    displayMode={displayMode}
                    onToggle={handleToggle}
                />
            </div>
        </div>
    )
}