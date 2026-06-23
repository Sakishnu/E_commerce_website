import * as React from "react"
import { cn } from "../../utils/cn"
import { ChevronDown } from "lucide-react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, label, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {label && (
          <span className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
            {label}
          </span>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer hover:bg-accent/40 transition-colors",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground/75">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    )
  }
)
Select.displayName = "Select"
export const SelectOption = ({ ...props }: React.OptionHTMLAttributes<HTMLOptionElement>) => {
  return <option className="bg-background text-foreground" {...props} />
}
