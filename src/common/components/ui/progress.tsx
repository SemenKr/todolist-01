import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/common/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const safeValue = value ?? 0
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - safeValue}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

type LinearProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  thickness?: number
}

function LinearProgress({
  className,
  value,
  thickness = 3,
  ...props
}: LinearProgressProps) {
  const hasValue = value !== undefined && value !== null
  const safeValue = value ?? 0
  return (
    <ProgressPrimitive.Root
      data-slot="linear-progress"
      className={cn(
        "bg-primary/20 relative w-full overflow-hidden rounded-none",
        className
      )}
      style={{ height: thickness }}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="linear-progress-indicator"
        className={cn(
          "bg-primary h-full w-full",
          !hasValue && "animate-[linear-progress_1.1s_ease-in-out_infinite]"
        )}
        style={!hasValue ? undefined : { transform: `translateX(-${100 - safeValue}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress, LinearProgress }
