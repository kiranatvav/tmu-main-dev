import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { InputProps } from "./types";

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8.2 6.2 11 13 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, fullWidth, valid, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col relative", fullWidth && "w-full")}>
        <input
          ref={ref}
          className={cn(
            // Base styles
            "w-full h-[44px] px-4 text-[16px] rounded-[16px] transition-all duration-200",
            "font-['Satoshi',sans-serif] leading-[1.5]",
            "focus:outline-none focus:ring-0",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "placeholder:text-[#454545]",
            "text-white",

            // Default state
            "bg-[#0f0f0f] border border-[rgba(255,255,255,0.04)]",

            // Focused state - green border with ripple animation
            "focus:!border-[#00ff05] focus:shadow-[0px_0px_35px_0px_rgba(132,255,0,0.31)] focus:animate-ripple",

            // Error state
            error && "!border-red-500 focus:!border-red-500",

            valid && "pr-10",
            fullWidth && "w-full",
            className
          )}
          {...props}
        />
        {valid && (
          <span className="input-check-icon" aria-hidden="true">
            <CheckIcon />
          </span>
        )}
        {error && <span className="mt-1 text-sm text-red-400">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
