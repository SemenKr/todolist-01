import './App.css'
import {TodolistItem} from './components/TodolistItem.tsx';
import {useState} from 'react';
import {FilterValueType, TaskType} from './types/types.ts';
import {v1} from 'uuid';



export const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: true},
    ]);

    const [filter, setFilter] = useState<FilterValueType>('all');

    let tasksForToDoList = tasks;

    if (filter === 'completed') {
        tasksForToDoList = tasks.filter((item) => item.isDone)
    }
    if (filter === 'active') {
        tasksForToDoList = tasks.filter((item) =>
            !item.isDone)
    }
    function addTask(taskTitle: string) {
        console.log(taskTitle);
        const newTask: TaskType = {id: v1(), title: taskTitle, isDone: false};
        setTasks([...tasks, newTask])
    }

    function removeTask(id: string) {
        const taskToRemove = tasks.find(task => task.id === id);

        let FilteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(FilteredTasks);

        console.log('Осталось задач: ' + FilteredTasks.length + ', Удалили задачу: ', taskToRemove?.title);

    }

    function toggleTask(id: string) {

        setTasks(prevTasks => prevTasks.map(task =>
            task.id === id ? {...task, isDone: !task.isDone} : task
        ));
    }

    function setFilerValue(value: FilterValueType) {
        setFilter(value);
    }

    return (
        <div className="app">
            <TodolistItem
                title="What to learn"
                tasks={tasksForToDoList}
                removeTask={removeTask}
                toggleTask={toggleTask}
                setFilerValue={setFilerValue}
                addTask={addTask}
            />
        </div>
    )
}
