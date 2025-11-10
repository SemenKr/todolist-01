import './App.css'
import {TodolistItem} from './components/Todolist/TodolistItem.tsx';
import {FilterValueType, TasksListType, TaskType, ToDoListType} from './types/types.ts';
import {v1} from 'uuid';
import {Toaster} from 'sonner';
import {useLocalStorage} from '@/hooks/useLocalStorage.ts';
import {Button} from '@/components/ui/button.tsx';
import {AddTodolistDialog} from '@/components/Todolist/AddTodolistDialog.tsx';
import {Header} from '@/components/layout/Header.tsx';
import {ThemeProvider} from '@/components/theme-provider.tsx';


export const App = () => {
    // Создаем начальные данные один раз при загрузке
    const initialTodoLists: ToDoListType[] = [
        {
            id: v1(),
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: v1(),
            title: 'What to buy',
            filter: 'all'
        }
    ];

    // Функция для получения начальных задач
    const getInitialTasks = (todoListsArray: ToDoListType[]): TasksListType => {
        if (!todoListsArray || todoListsArray.length === 0) {
            return {};
        }
        return {
            [todoListsArray[0].id]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JavaScript', isDone: false},
                {id: v1(), title: 'React', isDone: false},
            ],
            [todoListsArray[1].id]: [
                {id: v1(), title: 'Books', isDone: true},
                {id: v1(), title: 'Milk', isDone: false},
                {id: v1(), title: 'Bread', isDone: false},
            ],
        };
    };

    const [todoLists, setTodoLists] = useLocalStorage<ToDoListType[]>('todoLists', initialTodoLists);
    const [tasks, setTasks] = useLocalStorage<TasksListType>('todolist-tasks', getInitialTasks(initialTodoLists));

    // Функция добавления нового тудулиста
    function addTodolist(title: ToDoListType['title']) {
        const newTodoListId = v1();
        const newTodoList = {
            id: newTodoListId,
            title: title,
            filter: 'all' as const
        }

        setTodoLists([...todoLists, newTodoList]);
        setTasks({
            ...tasks,
            [newTodoListId]: []
        });
    }

    function deleteTodolist(todolistId: ToDoListType['id']) {
        setTodoLists(todoLists.filter(list => list.id !== todolistId));
        setTasks(prevTasks => {
            const newTasks = {...prevTasks};
            delete newTasks[todolistId];
            return newTasks;
        });
    }

    function getTasksForTodolist(todolistId: ToDoListType['id']) {
        return tasks[todolistId] || []
    }

    function addTask(taskTitle: string, todolistId: ToDoListType['id']) {
        const newTask: TaskType = {id: v1(), title: taskTitle, isDone: false};
        setTasks({
            ...tasks,
            [todolistId]: [...getTasksForTodolist(todolistId), newTask]
        })
    }

    function removeTask(taskId: TaskType['id'], todolistId: ToDoListType['id']) {
        setTasks({
            ...tasks,
            [todolistId]: getTasksForTodolist(todolistId).filter(task => task.id !== taskId),
        });
    }

    function editTask(taskId: TaskType['id'], newTitle: TaskType['title'], todolistId: ToDoListType['id']) {
        setTasks({
            ...tasks,
            [todolistId]: getTasksForTodolist(todolistId).map(task =>
                task.id === taskId ? {...task, title: newTitle} : task
            ),
        })
    }

    function changeTaskStatus(taskId: TaskType['id'], newStatus: TaskType['isDone'], todolistId: ToDoListType['id']) {
        setTasks({
            ...tasks,
            [todolistId]: getTasksForTodolist(todolistId).map(task =>
                task.id === taskId ? {...task, isDone: newStatus} : task
            ),
        });
    }

    function changeFilter(value: FilterValueType, todolistId: ToDoListType['id']) {
        setTodoLists(todoLists.map(tl =>
            tl.id === todolistId ? {...tl, filter: value} : tl
        ));
    }

    function clearTasks(todolistId: ToDoListType['id']) {
        setTasks({
            ...tasks,
            [todolistId]: [],
        })
    }

    // Функция для сброса к начальным данным
    function resetToInitialData() {
        setTodoLists(initialTodoLists);
        setTasks(getInitialTasks(initialTodoLists));
    }

    const getMappedTodoLists = () => {
        if (!todoLists || todoLists.length === 0) {
            return (
                <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Нет списков задач</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Создайте свой первый список задач или восстановите демо-данные
                        </p>
                        <Button onClick={resetToInitialData} className="mb-4">
                            Восстановить демо-данные
                        </Button>
                    </div>
                </div>
            )
        }

        return (
            <>
                {todoLists.map(list => (
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
