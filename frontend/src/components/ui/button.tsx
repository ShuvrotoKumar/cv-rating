import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#4F46E5] text-white shadow hover:bg-[#4338CA]",
        destructive:
          "bg-rose-600 text-white shadow-sm hover:bg-rose-700",
        outline:
          "border border-slate-200 dark:border-slate-800 bg-transparent shadow-sm hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200",
        secondary:
          "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700",
        ghost:
          "hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200",
        link: "text-[#4F46E5] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    // When asChild is true, clone the single child element and inject button styles into it
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
        className: cn(
          buttonVariants({ variant, size }),
          className,
          (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.className
        ),
      });
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
