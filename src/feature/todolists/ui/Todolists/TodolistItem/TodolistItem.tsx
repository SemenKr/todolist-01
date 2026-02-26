import {Button, CardFooter} from '@/common/components/ui';
import {Card, CardContent, CardHeader} from '@/common/components/ui/card.tsx';
import {Title} from '@/common/components/ui/title.tsx';
import {CreateItemForm} from '@/CreateItemForm.tsx';
import {useAddTaskMutation} from '@/feature/todolists/api/tasksApi';
import {useRemoveTodolistMutation} from '@/feature/todolists/api/todolistsApi';
import type {DomainTodolist} from '@/feature/todolists/libs/types';
import {FilterButtons} from '@/feature/todolists/ui/Todolists/Todolist/FilterButtons.tsx';
import {Tasks} from '@/feature/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx';

type TodolistItemPropsType = {
    todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: TodolistItemPropsType) => {
    const { id, title } = todolist
    const [addTask, { isLoading: isAddingTask }] = useAddTaskMutation()
    const [removeTodolist, { isLoading: isRemovingTodolist }] = useRemoveTodolistMutation()
    const isBusy = isAddingTask || isRemovingTodolist

    const deleteTodolist = () => {
        if (isRemovingTodolist) return
        removeTodolist(id)
    }
    const createTask = (title: string) => {
        if (isAddingTask) return
        addTask({ todolistId: todolist.id, title })
    }

    return (
        <Card className="w-full max-w-sm shrink-0 lg:flex-1 lg:max-w-none">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <Title level={3}>{title}</Title>

                <Button variant="ghost" onClick={deleteTodolist} disabled={isRemovingTodolist}>
                    ✕
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">
                <CreateItemForm onAdd={createTask} placeholder="add Task ..." disabled={isBusy} />

                <FilterButtons
                    todolist={todolist}
                />

                <Tasks todolist={todolist} />
            </CardContent>

            <CardFooter />
        </Card>
    )
}
