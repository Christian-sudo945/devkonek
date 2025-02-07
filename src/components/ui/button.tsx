import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

const getClassNames = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    let variantClassNames = "";
    switch (variant) {
      case "default":
        variantClassNames = "bg-primary text-primary-foreground hover:bg-primary/90";
        break;
      case "destructive":
        variantClassNames = "bg-destructive text-destructive-foreground hover:bg-destructive/90";
        break;
      case "outline":
        variantClassNames = "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
        break;
      case "secondary":
        variantClassNames = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
        break;
      case "ghost":
        variantClassNames = "hover:bg-accent hover:text-accent-foreground";
        break;
      case "link":
        variantClassNames = "text-primary underline-offset-4 hover:underline";
        break;
    }

    let sizeClassNames = "";
    switch (size) {
      case "default":
        sizeClassNames = "h-10 px-4 py-2";
        break;
      case "sm":
        sizeClassNames = "h-9 rounded-md px-3";
        break;
      case "lg":
        sizeClassNames = "h-11 rounded-md px-8";
        break;
      case "icon":
        sizeClassNames = "h-10 w-10";
        break;
    }

    return (
      <Comp
        className={getClassNames(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantClassNames,
          sizeClassNames,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
