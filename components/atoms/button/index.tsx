import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonProps } from "./types";

const buttonVariants = cva(
  "rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:cursor-pointer min-h-[52px]",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800",
        secondary:
          "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800",
        outline:
          "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100",
        cta: "bg-[#00ff05] text-[#080808] border border-white/10 hover:bg-[#00f005] active:bg-[#00dd05] hover:scale-105 focus:ring-[#00ff05]/50 font-black uppercase rounded-[16px] h-[56px] px-4 py-[10px] whitespace-nowrap leading-none text-[16px] flex items-center justify-center gap-2",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export const Button = ({
  children,
  variant,
  size,
  fullWidth,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      style={{ cursor: "pointer" }}
      {...props}
    >
      {children}
    </button>
  );
};
