import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-card w-full h-9 px-4 rounded-md text-sm outline-none focus:ring-border focus:ring-2 transition-all duration-250 ease-in-out placeholder:text-border",
        className
      )}
      {...props}
    />
  )
}

export { Input }

