import './App.css'
import {TodolistItem} from './components/Todolist/TodolistItem.tsx';
import {FilterValueType, TaskType, ToDoListType} from './types/types.ts';
import {Toaster} from 'sonner';
import {AddTodolistDialog} from '@/components/Todolist/AddTodolistDialog.tsx';
import {Header} from '@/components/layout/Header.tsx';
import {ThemeProvider} from '@/components/theme-provider.tsx';
import {useAppDispatch} from '@/hooks/useAppDispatch.ts';
import {useAppSelector} from '@/hooks/useAppSelector.ts';
import {selectTodolists} from '@/models/todolists/todolists-selectors.ts';
import {selectTasks} from '@/models/tasks/tasks-selectors.ts';
import {changeTodolistFilterAC, createTodolistAC, deleteTodolistAC} from '@/models/todolists/todolists-reducer.ts';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    clearTaskAC,
    createTaskAC,
    deleteTaskAC
} from '@/models/tasks/tasks-reucer.ts';


export const App = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()


    // Функция добавления нового тудулиста
    function addTodolist(title: ToDoListType['title']) {
        dispatch(createTodolistAC(title))
    }

    function deleteTodolist(todolistId: ToDoListType['id']) {
        dispatch(deleteTodolistAC({id: todolistId}))
    }

    function addTask(taskTitle: string, todolistId: ToDoListType['id']) {
        dispatch(createTaskAC({title: taskTitle, todolistId: todolistId}))
    }

    function removeTask(taskId: TaskType['id'], todolistId: ToDoListType['id']) {
       dispatch(deleteTaskAC({taskId: taskId, todolistId: todolistId}))
    }

    function editTask(taskId: TaskType['id'], newTitle: TaskType['title'], todolistId: ToDoListType['id']) {
        dispatch(changeTaskTitleAC({taskId, title: newTitle, todolistId}))
    }

    function changeTaskStatus(taskId: TaskType['id'], newStatus: TaskType['isDone'], todolistId: ToDoListType['id']) {
        dispatch(changeTaskStatusAC({taskId, isDone: newStatus, todolistId: todolistId}))
    }

    function changeFilter(value: FilterValueType, todolistId: ToDoListType['id']) {
        dispatch(changeTodolistFilterAC({id: todolistId, filter: value}))
    }

    function clearTasks(todolistId: ToDoListType['id']) {
        dispatch(clearTaskAC({todolistId}))
    }

    const getMappedTodoLists = () => {
        if (!todolists || todolists.length === 0) {
            return (
                <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Нет списков задач</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Создайте свой первый список задач или восстановите демо-данные
                        </p>
                        <AddTodolistDialog onAddTodolist={addTodolist}/>
                    </div>
                </div>
            )
        }

        return (
            <>
                {todolists.map(list => (
                    <TodolistItem
                        key={list.id}
                        id={list.id}
                        title={list.title}
                        tasks={tasks[list.id]}
                        removeTask={removeTask}
                        toggleTask={changeTaskStatus}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        editTask={editTask}
                        filter={list.filter}
                        clearTasks={clearTasks}
                        deleteTodolist={deleteTodolist}
                    />
                ))}

                <AddTodolistDialog onAddTodolist={addTodolist}/>
            </>
        )
    }

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen flex flex-col bg-background">
                <Header/>
                <main className="flex-1 p-4">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {getMappedTodoLists()}
                        </div>
                    </div>
                </main>
                <Toaster position={'bottom-center'} duration={700}/>
            </div>
        </ThemeProvider>
    )
}
