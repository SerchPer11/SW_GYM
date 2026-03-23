import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-slate-800/90 text-slate-200 border border-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-slate-800/80 hover:shadow-[0_4px_12px_rgba(15,23,42,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]",
        
        destructive:
          "bg-rose-600 text-white border border-rose-700 shadow-[0_2px_8px_rgba(225,29,72,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-rose-500 hover:shadow-[0_4px_12px_rgba(225,29,72,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]",
        
        outline:
          "border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]",
        
        secondary:
          "bg-slate-100 text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-200 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]",
        
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        link: "text-slate-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
