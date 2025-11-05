import './App.css'
import {TodolistItem} from './components/Todolist/TodolistItem.tsx';
import {FilterValueType, TasksListType, TaskType, ToDoListType} from './types/types.ts';
import {v1} from 'uuid';
import {Toaster} from 'sonner';
import {useLocalStorage} from '@/hooks/useLocalStorage.ts';


export const App = () => {

    const [todoLists, setTodoLists] = useLocalStorage<ToDoListType[]>('todoLists', [
        {
            id: v1(),
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: v1(),
            title: 'What to bye',
            filter: 'all'
        }
    ]);

    const [tasks, setTasks] = useLocalStorage<TasksListType>('todolist-tasks', {
            [todoLists[0].id]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
            ],
            [todoLists[1].id]: [
                {id: v1(), title: 'books', isDone: true},
            ],
        }
    )


    function getTasksForTodolist (todolistId: ToDoListType['id']) {
        return tasks[todolistId] || []
    }
    function addTask(taskTitle: string, todolistId: ToDoListType['id']) {
        console.log(taskTitle);
        const newTask: TaskType = {id: v1(), title: taskTitle, isDone: false};
        setTasks({
            ...tasks,
            [todolistId]: [...getTasksForTodolist(todolistId), newTask]
        })
    }

    function removeTask(taskId: TaskType['id'], todolistId: ToDoListType['id']) {
        const taskToRemove = getTasksForTodolist(todolistId).find(task => task.id === taskId);


        setTasks({
            ...tasks,
            [todolistId]: [...getTasksForTodolist(todolistId).filter(task => task.id !== taskId)],
        });
        console.log('Удалили задачу: ', taskToRemove?.title);
    }

    function editTask(taskId: TaskType['id'], newTitle: TaskType['title'], todolistId: ToDoListType['id']) {

        setTasks({
            ...tasks,
            [todolistId]: getTasksForTodolist(todolistId).map(task => task.id === taskId ? {...task, title: newTitle } : task),
        })
    }

    function changeTaskStatus(taskId: TaskType['id'], newStatus: TaskType['isDone'], todolistId: ToDoListType['id']) {

        setTasks({
            ...tasks,
            [todolistId]: getTasksForTodolist(todolistId).map(task => task.id === taskId ? {...task, isDone: newStatus } : task),
        });
    }

    function changeFilter(value: FilterValueType, todolistId: ToDoListType['id']) {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl));
    }

    function clearTasks(todolistId: ToDoListType['id']) {
        setTasks({
            ...tasks,
            [todolistId]: [],
        })
    }

    const getMappedTodoLists = () => {
        return (
            todoLists.length > 0 && todoLists.map(list => {
                return (
                    <TodolistItem
                        key={list.id}
                        id={list.id}
                        title={list.title}
                        tasks={getTasksForTodolist(list.id)}
                        removeTask={removeTask}
                        toggleTask={changeTaskStatus}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        editTask={editTask}
                        filter={list.filter}
                        clearTasks={clearTasks}
                    />
                )
            })
        )

    }
    return (
        <div className="min-h-screen p-4 bg-background">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {getMappedTodoLists()}
                </div>
            </div>
            <Toaster />
        </div>
    )
}
