import { Task } from "@/utils/types";
import { Checkbox } from "@/components/ui/checkbox";


export default function DisplayTask({ showTask, displayMode, onToggle }: { showTask: Task[], displayMode: "grid" | "list", onToggle: (state: Task) => void }) {
    return (
        <div className={`${displayMode === "list" ? "flex flex-col gap-5" : "grid grid-cols-1 md:grid-cols-3 gap-5"}`}>
            {showTask.map((t, i) => {
                return (
                    <div key={i} className="p-5 bg-card border-border border-2 flex items-center rounded-xl justify-between">
                        <div className="flex gap-5 items-center">
                            <div className="size-3 rounded-full bg-success" />
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{t.note}</p>
                                <p className="text-sm text-primary">{t.tag}</p>
                            </div>
                        </div>
                        <Checkbox checked={t.state} onCheckedChange={() => onToggle(t)} />
                    </div>

                )
            })}
        </div>
    )
}