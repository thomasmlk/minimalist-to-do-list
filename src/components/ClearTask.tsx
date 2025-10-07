import { Eraser } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ClearTask({ onClear }: { onClear: () => void }) {
    return (
        <div className="w-full md:w-fit">
            <Button className="w-full md:w-fit" variant="destructive" onClick={onClear}><Eraser />Clear</Button>
        </div>
    )
}