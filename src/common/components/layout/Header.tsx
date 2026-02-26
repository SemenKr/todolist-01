import {selectAppStatus, selectIsLoggedIn, setIsLoggedInAC} from '@/app/appSlice';
import {baseApi} from '@/app/baseApi';
import {AUTH_TOKEN} from '@/common/constants';
import {ResultCode} from '@/common/enums';
import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {useAppSelector} from '@/common/hooks/useAppSelector';
import { ModeToggle } from "@/components/mode-toggle.tsx"
import { LinearProgress } from "@/common/components/ui"
import { Button } from "@/common/components/ui/button.tsx"
import { cn } from "@/common/lib/utils.ts"
import {useLogoutMutation} from '@/feature/auth/api/authApi';
import { ListTodo } from "lucide-react";
import { Link } from "react-router";

export const Header = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const status = useAppSelector(selectAppStatus)

    const [logout] = useLogoutMutation()

    const dispatch = useAppDispatch()
    const logoutHandler = () => {
        logout()
            .then((res) => {
                if (res.data?.resultCode === ResultCode.Success) {
                    dispatch(setIsLoggedInAC({ isLoggedIn: false }))
                    localStorage.removeItem(AUTH_TOKEN)
                }
            })
            .then(() => {
                dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
            })
    }
    return (
        <header className={cn("border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50 relative")}>
            <div className="container mx-auto flex h-12 items-center justify-between px-3">
                <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                    aria-label="ToDoList"
                >
                    <ListTodo className="h-5 w-5 text-primary" />
                </Link>

                <nav className="flex items-center gap-2" aria-label="Primary">
                    {isLoggedIn && (
                        <Button variant="outline" size="sm" onClick={logoutHandler}>
                            Sign out
                        </Button>
                    )}
                    <ModeToggle />
                </nav>
            </div>
            {status === "loading" && (
                <LinearProgress className="absolute left-0 right-0 bottom-0" />
            )}
        </header>
    )
}
