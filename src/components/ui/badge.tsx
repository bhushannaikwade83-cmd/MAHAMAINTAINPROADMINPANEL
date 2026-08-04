import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-ring/50",
  {
    variants: {
      variant: {
        default:
          "border-transparent gradient-saffron text-primary-foreground btn-press shadow-glow sheen shadow-glow hover:brightness-110",
        secondary: "border-transparent bg-primary-soft text-primary hover:bg-accent",
        destructive:
          "border-transparent bg-destructive/12 text-destructive hover:bg-destructive/20",
        success: "border-transparent bg-success/14 text-success",
        warning: "border-transparent bg-warning/22 text-warning-foreground",
        info: "border-transparent bg-info/14 text-info",
        outline: "border-primary/35 text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
