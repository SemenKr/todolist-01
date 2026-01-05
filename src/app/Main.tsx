import {useAppDispatch} from '@/common/hooks/useAppDispatch'
import {useAppSelector} from '@/common/hooks/useAppSelector'
import {createTodolistTC, fetchTodolistsTC, selectTodolists} from '@/feature/todolists/model/todolists-slice'
import {EmptyTodolistsState} from '@/feature/todolists/ui/Todolists/EmptyTodolistsState/EmptyTodolistsState';
import {AddTodolistDialog} from '@/feature/todolists/ui/Todolists/Todolist/AddTodolistDialog'
import {TodolistItem} from '@/feature/todolists/ui/Todolists/TodolistItem'
import {ToDoListType} from '@/types/types'
import {useCallback, useEffect} from 'react'

export const Main = () => {
    const todolists = useAppSelector(selectTodolists)
    const dispatch = useAppDispatch()

    const addTodolist = useCallback(
        (title: ToDoListType['title']) => {
            dispatch(createTodolistTC(title))
        },
        [dispatch]
    )

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    return (
        <main className="flex-1 p-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {todolists.length === 0 ? (
                        <EmptyTodolistsState onAddTodolist={addTodolist} />
                    ) : (
                        <>
                            {todolists.map(list => (
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
