import { Button } from "@/components/ui/button"
import { Check, Plus } from "lucide-react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from "@/utils/types";

export default function AddTask({ onSubmit }: { onSubmit: (newTask: Task) => void }) {

    const [showform, setShowform] = useState(false);
    const [note, setNote] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [tag, setTag] = useState("All");

    const prio = ["Low", "Medium", "High"];
    const hashtag = ["All", "Productivity", "Work", "Games", "Chill", "Workout", "Cooking"];

    function handleSubmit() {
        const newTask = { note, priority, tag, state: false };
        onSubmit(newTask);
    }

    return (
        <div>
            <Button variant="default" onClick={() => setShowform(!showform)}><Plus />Add Task</Button>
            {showform && (
                <form className="w-3xl left-1/2 flex -translate-x-1/2 mt-5 p-5 rounded-xl border-2 border-border shadow-xl absolute flex-col gap-5 bg-card" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <Textarea className="w-full" placeholder="Let's add a note for this horror movies night..." onChange={(e) => setNote(e.target.value)} />
                    <div className="flex justify-between">
                        <div className="flex gap-5">
                            <div className="px-5 text-sm h-9 rounded-xl flex border-2 border-border">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>{priority || "Priority"}</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {prio.map((p, i) => {
                                            return (
                                                <div key={i}>
                                                    <DropdownMenuItem onSelect={() => setPriority(p)}>{p}</DropdownMenuItem>
                                                </div>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="px-5 text-sm h-9 rounded-xl flex border-2 border-border">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>{tag || "Tag"}</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {hashtag.map((h, i) => {
                                            return (
                                                <div key={i}>
                                                    <DropdownMenuItem onSelect={() => setTag(h)}>{h}</DropdownMenuItem>
                                                </div>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <Button variant="default" type="submit"><Check />Confirm</Button>
                    </div>
                </form>
            )}
        </div>
    )
}