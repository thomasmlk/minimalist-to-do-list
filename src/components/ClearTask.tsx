import { Eraser } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ClearTask({ onClear }: { onClear: () => void }) {
    return (
        <div>
            <Button variant="destructive" onClick={onClear}><Eraser />Clear</Button>
        </div>
    )
}