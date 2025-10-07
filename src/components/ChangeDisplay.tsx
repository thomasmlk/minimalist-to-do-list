import { Button } from "@/components/ui/button";
import { Grid2X2, Rows3 } from "lucide-react";

export default function ChangeDisplay({ displayMode, onClick }: { displayMode: "list" | "grid", onClick: () => void }) {

    return (
        <div className="hidden md:block">
            <Button variant="secondary" size="icon" onClick={onClick}>{displayMode === "list" ? <Rows3 /> : <Grid2X2 />}</Button>
        </div>
    )
}