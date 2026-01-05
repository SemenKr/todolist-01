import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {Button, CardFooter} from '@/components/ui';
import {Badge} from '@/components/ui/badge.tsx';
import {Card, CardContent, CardHeader} from '@/components/ui/card.tsx';
import {Title} from '@/components/ui/title.tsx';
import {CreateItemForm} from '@/CreateItemForm.tsx';
import {createTaskTC, selectTasksByTodolistId} from '@/feature/todolists/model/tasks-slice.ts';
import {changeTodolistFilterAC, deleteTodolistTC} from '@/feature/todolists/model/todolists-slice.ts';
import {FilterButtons} from '@/feature/todolists/ui/Todolists/Todolist/FilterButtons.tsx';
import {Tasks} from '@/Tasks.tsx';
import {FilterValueType, ToDoListType} from '@/types/types.ts';
import {toast} from 'sonner';

type TodolistItemPropsType = {
    todolist: ToDoListType
}

export const TodolistItem = ({ todolist }: TodolistItemPropsType) => {
    const { id, title, filter } = todolist
    const dispatch = useAppDispatch()

    const tasks = useAppSelector(state => selectTasksByTodolistId(state, id))

    const addTaskHandler = (title: string) => {
        const trimmed = title.trim()
        if (!trimmed) {
            toast.error('Введите текст задачи')
            return
        }

        dispatch(createTaskTC({ title: trimmed, todolistId: id }))
        toast.success('Задача добавлена! 🎉')
    }

    const handleFilterChange = (value: FilterValueType) => {
        dispatch(changeTodolistFilterAC({ id, filter: value }))
    }

    const handleDeleteTodolist = () => {
        dispatch(deleteTodolistTC(id))
        toast.success('Список удалён')
    }

    return (
        <Card className="w-full max-w-sm shrink-0 lg:flex-1 lg:max-w-none">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <Title level={3}>{title}</Title>

                <Badge variant="secondary" className="hidden sm:inline-flex">
                    {tasks.length}
                </Badge>

                <Button variant="ghost" onClick={handleDeleteTodolist}>
                    ✕
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">
                <CreateItemForm onAdd={addTaskHandler} placeholder="add Task ..." />

                <FilterButtons
                    currentFilter={filter}
                    onFilterChange={handleFilterChange}
                />

                <Tasks todolistId={id} filter={filter} />
            </CardContent>

            <CardFooter />
        </Card>
    )
}
