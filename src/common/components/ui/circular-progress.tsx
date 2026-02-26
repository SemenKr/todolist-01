import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/common/lib/utils"

type CircularProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  size?: number
  thickness?: number
  value?: number
}

function CircularProgress({
  size = 40,
  thickness = 4,
  value,
  className,
  ...props
}: CircularProgressProps) {
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const isIndeterminate = value === undefined || value === null
  const clampedValue = Math.min(100, Math.max(0, value ?? 0))
  const dashArray = isIndeterminate ? circumference * 0.65 : circumference
  const dashOffset = isIndeterminate
    ? circumference * 0.35
    : circumference - (clampedValue / 100) * circumference

  return (
    <ProgressPrimitive.Root
      data-slot="circular-progress"
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      value={value}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn(isIndeterminate && "animate-spin")}
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          className="text-muted/30"
          stroke="currentColor"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          className="text-primary"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          fill="none"
        />
      </svg>
    </ProgressPrimitive.Root>
  )
}

export { CircularProgress }
