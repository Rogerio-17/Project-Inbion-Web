import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: "primary" | "secondary" | "ghost"
}

export function Button({ children, variant = "primary", ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={
                cn(
                    "p-3 text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70",
                    variant === "primary" && "bg-accent-purple",
                    variant === "secondary" && "bg-background-tertiary",
                    variant === "ghost" && "border-border-primary",
                    props.className
                )}
        >
            {children}
        </button>
    )
}