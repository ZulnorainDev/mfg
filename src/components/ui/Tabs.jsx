import { useState, createContext, useContext } from "react"
import { cn } from "../../lib/Utils"

const TabsContext = createContext()

export function Tabs({ children, value, onValueChange, defaultValue, className, ...props }) {
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || "")

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
    if (onValueChange) onValueChange(newValue)
  }

  return (
    <TabsContext.Provider value={{ selectedValue, handleValueChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({ className, children, value, ...props }) {
  const { selectedValue, handleValueChange } = useContext(TabsContext)
  const isSelected = selectedValue === value

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected ? "bg-gradient-to-bl from-[var(--1)]/20 to-[var(--1)]/30 text-foreground shadow-sm" : "hover:bg-background/50 hover:text-foreground",
        className,
      )}
      onClick={() => handleValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ className, children, value, ...props }) {
  const { selectedValue } = useContext(TabsContext)

  if (selectedValue !== value) return null

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
