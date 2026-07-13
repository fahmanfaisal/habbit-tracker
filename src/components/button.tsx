import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "ghost-destructive";

type ButtonProps = {
    variant?: Variant;
} & ComponentProps<"button">;
 
export function Button({ variant = "primary", className, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={twMerge(
                getVariantStyles(variant),
                "font-medium px-2 py-1.5 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded",
                className
            )}
        />
    );
}

function getVariantStyles(variant: Variant) {
    switch (variant) {
        case "primary":
            return "bg-blue-500 hover:bg-blue-600 text-white";
        case "secondary":
            return "bg-zinc-700 hover:bg-zinc-600 text-zinc-400";
        case "ghost-destructive":
            return "bg-transparent hover:bg-red-800 text-red-800 hover:text-red-200";
        default:
            throw new Error(`Invalid variant: ${variant satisfies never}`);
    }
}