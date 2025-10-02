import { Plus, Eraser } from "lucide-react";
import AddTask from "@/components/add-task";
import DisplayTask from "@/components/display-task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="pt-30 max-w-3xl mx-auto flex flex-col gap-20 px-5">

      <div className="font-bold text-5xl">
        Minimalist to-do list
      </div>

      <div className="w-full flex justify-end gap-3">
        <Input placeholder="Search for a task..." />
        <AddTask />
        <Button variant="destructive"><Eraser />Clean</Button>
      </div>

      <div className="flex flex-col gap-5">
        <div className="font-semibold">
          Current tasks
        </div>
        <DisplayTask />
      </div>

      <div className="flex flex-col gap-5">
        <div className="font-semibold">
          Tasks completed
        </div>
      </div>

    </div>
  );
}