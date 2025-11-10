import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const Header = () => {
    return (
        <header className={cn("border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50")}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <h1 className="text-xl font-bold tracking-tight">ToDoList</h1>

                <nav className="flex items-center gap-3">
                    <Button variant="ghost" size="sm">Home</Button>
                    <Button variant="ghost" size="sm">About</Button>
                    <ModeToggle />
                </nav>
            </div>
        </header>
    )
}
