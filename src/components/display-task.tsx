"use client"

import { useEffect, useState } from "react";

export default function DisplayTask() {

    interface Task {
        note: string;
        level: string;
        tag: string
    }

    const color: { [key: string]: string } = {
        Low: "bg-success",
        Medium: "bg-danger",
        High: "bg-destructive",
    }

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const storedTasks: Task[] = JSON.parse(localStorage.getItem("task") || "[]");
        setTasks(storedTasks)
    }, [])

    useEffect(() => {
        const updateTasks = () => {
            const storedTasks = JSON.parse(localStorage.getItem("task") || "[]");
            setTasks(storedTasks);
        };

        window.addEventListener("tasksUpdated", updateTasks);
        return () => window.removeEventListener("tasksUpdated", updateTasks);
    }, []);

    return (
        <>
            {tasks.slice(0).reverse().map((note, i) => {
                return (
                    <div key={i} className="bg-card border-2 border-border p-4 w-full rounded-lg flex items-center gap-4">
                        <div className={`size-2 ${color[note.level] || "bg-gray-500"} rounded-full`}></div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium">{note.note}</p>
                            <p className="text-xs font-medium text-primary">{note.tag}</p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}