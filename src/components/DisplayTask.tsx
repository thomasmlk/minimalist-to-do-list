import { Task } from "@/utils/types"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox";

export default function DisplayTask({ tasks, onToggle }: { tasks: Task[]; onToggle: (state: Task) => void }) {

    return (
        <div className="flex flex-col gap-5">
            {tasks.toReversed().map((t, i) => {
                return (
                    <div key={i} className="p-5 bg-card border-2 border-border flex items-center justify-between rounded-xl">
                        <div className="flex gap-5 items-center">
                            <div className="size-3 bg-success rounded-full" />
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{t.note}</p>
                                <p className="text-xs text-primary">{t.tag}</p>
                            </div>
                        </div>
                        <Checkbox checked={t.state} onCheckedChange={() => onToggle(t)}  />
                    </div>
                )
            })}
        </div>
    )
}