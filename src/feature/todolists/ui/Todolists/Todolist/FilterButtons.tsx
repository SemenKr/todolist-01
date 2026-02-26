import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {Button} from '@/common/components/ui';
import {todolistsApi} from '@/feature/todolists/api/todolistsApi';
import type {FilterValues} from '@/feature/todolists/libs/types';
import {FilterButtonsProps} from '@/types/types'

export const FilterButtons = ({ todolist }: FilterButtonsProps) => {
    const { id, filter } = todolist
    const dispatch = useAppDispatch()

    const changeFilter = (filter: FilterValues) => {
        dispatch(
            todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
                const todolist = state.find((todolist) => todolist.id === id)
                if (todolist) {
                    todolist.filter = filter
                }
            }),
        )
    }


    return (
        <div className="flex gap-1 sm:gap-2">
            <Button variant={filter === "all" ? "outline" : "ghost"}  onClick={() => changeFilter("all")}>
                All
            </Button>
            <Button
                variant={filter === "active" ? "outline" : "ghost"}
                onClick={() => changeFilter("active")}
            >
                Active
            </Button>
            <Button
                variant={filter === "completed" ? "outline" : "ghost"}
                onClick={() => changeFilter("completed")}
            >
                Completed
            </Button>
        </div>
    )
}
