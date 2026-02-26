import {useAddTodolistMutation, useGetTodolistsQuery} from '@/feature/todolists/api/todolistsApi';
import {EmptyTodolistsState} from '@/feature/todolists/ui/Todolists/EmptyTodolistsState/EmptyTodolistsState';
import {AddTodolistDialog} from '@/feature/todolists/ui/Todolists/Todolist/AddTodolistDialog'
import {TodolistItem} from '@/feature/todolists/ui/Todolists/TodolistItem/TodolistItem'

export const Main = () => {

    const [addTodolist] = useAddTodolistMutation()
    const { data: todolists } = useGetTodolistsQuery()
    return (
        <main className="flex-1 p-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {todolists?.length === 0 ? (
                        <EmptyTodolistsState onAddTodolist={addTodolist} />
                    ) : (
                        <>
                            {todolists?.map(list => (
                                <TodolistItem key={list.id} todolist={list} />
                            ))}
                            <AddTodolistDialog onAddTodolist={addTodolist} />
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}
