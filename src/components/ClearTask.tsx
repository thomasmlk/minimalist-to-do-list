import { Button } from "@/components/ui/button"
import { Task } from "@/utils/types";
import { Eraser } from "lucide-react"

export default function ClearTask({ onClear }: { onClear: () => void }) {

    return (
        <>
            <Button variant="destructive" onClick={onClear}><Eraser />Clear</Button>
        </>
    )
}