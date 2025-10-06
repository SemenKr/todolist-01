import './App.css'
import {TodolistItem} from './components/TodolistItem.tsx';
import {useState} from 'react';
import {FilterValueType, TaskType} from './types/types.ts';



export const App = () => {

    const [tasks1, setTasks1] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: true},
    ]);

    const [filter, setFilter] = useState<FilterValueType>('all');

    let tasksForToDoList = tasks1;

    if (filter === 'completed') {
        tasksForToDoList = tasks1.filter((item) => item.isDone === true)
    }
    if (filter === 'active') {
        tasksForToDoList = tasks1.filter((item) =>
            item.isDone === false)
    }

    function removeTask(id: number) {
        const taskToRemove = tasks1.find(task => task.id === id);

        let FilteredTasks = tasks1.filter((task) => task.id !== id);
        setTasks1(FilteredTasks);

        console.log('Осталось задач: ' + FilteredTasks.length + ', Удалили задачу: ', taskToRemove?.title);

    }

    function toggleTask(id: number) {

        setTasks1(prevTasks => prevTasks.map(task =>
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
                date="123123"
                removeTask={removeTask}
                toggleTask={toggleTask}
                setFilerValue={setFilerValue}/>
        </div>
    )
}
