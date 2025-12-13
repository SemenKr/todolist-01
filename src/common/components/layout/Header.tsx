import { ModeToggle } from "@/components/mode-toggle.tsx"
import { Button } from "@/components/ui/button.tsx"
import { cn } from "@/common/lib/utils.ts"
import {clearAppData} from '@/app/store.ts';

export const Header = () => {
    return (
        <header className={cn("border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50")}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <h1 className="text-xl font-bold tracking-tight">ToDoList</h1>

                <nav className="flex items-center gap-3">
                    <Button onClick={clearAppData} variant="outline">
                        Очистить все данные
                    </Button>
                    <Button variant="ghost" size="sm">Home</Button>
                    <Button variant="ghost" size="sm">About</Button>
                    <ModeToggle />
                </nav>
            </div>
        </header>
    )
}
