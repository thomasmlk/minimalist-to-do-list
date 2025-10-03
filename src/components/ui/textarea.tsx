import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-border p-3 rounded-md text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
