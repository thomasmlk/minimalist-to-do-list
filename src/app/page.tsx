"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Task } from "@/utils/types";
import AddTask from "@/components/AddTask";
import ClearTask from "@/components/ClearTask";
import DisplayTask from "@/components/DisplayTask";
import Search from "@/components/search";

export default function Home() {

    const [task, setTask] = useState<Task[]>([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const read = JSON.parse(localStorage.getItem("tasks") || "[]");
        setTask(read);
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(task));
    }, [task])

    function handleAdd(newTask: Task) {
        setTask([...task, newTask]);
    }

    function handleRemove() {
        localStorage.removeItem("tasks");
        setTask([]);
    }

    function handleToggle(check: Task) {
        const checkState = task.map(t => t === check ? { ...t, state: !t.state } : t);
        setTask(checkState);
    }

    return (
        <div className="max-w-3xl flex flex-col mx-auto mt-30 gap-18">
            <h1 className="text-5xl font-bold">Minimalist To-Do List</h1>
            <div className="flex gap-5">
                <Search onSearch={(term) => setSearchTerm(term)} />
                <AddTask onSubmit={handleAdd} />
                <ClearTask onClear={handleRemove} />
            </div>
            <div className="flex flex-col gap-5">
                <h3 className="text-xl font-semibold">Current tasks</h3>
                {task.filter(t => !t.state &&
                    (t.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.tag.toLowerCase().includes(searchTerm.toLowerCase()))
                ).length === 0 ? (
                    <p className="italic text-sm text-foreground/60">No recent task added.</p>
                ) : (
                    task.filter(t => !t.state &&
                        (t.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.tag.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).toReversed().map((t, i) => (
                        <DisplayTask key={i} tasks={[t]} onToggle={handleToggle} />
                    ))
                )}

            </div>
            <div className="flex flex-col gap-5">
                <h3 className="text-xl font-semibold">Completed tasks</h3>
                {task.filter(t => t.state &&
                    (t.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.tag.toLowerCase().includes(searchTerm.toLowerCase()))
                ).length === 0 ? (
                    <p className="italic text-sm text-foreground/60">No completed tasks yet.</p>
                ) : (
                    task.filter(t => t.state &&
                        (t.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.tag.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).toReversed().map((t, i) => (
                        <DisplayTask key={i} tasks={[t]} onToggle={handleToggle} />
                    ))
                )}

            </div>
        </div>
    )
}