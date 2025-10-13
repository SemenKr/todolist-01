import { CustomButton} from './CustomButton.tsx';
import {TaskItem} from './TaskItem.tsx';
import {TodolistItemPropsType} from '../types/types.ts';
import {useState, KeyboardEvent} from 'react';


export const TodolistItem = (
    {
        title,
        tasks = [],
        removeTask,
        toggleTask,
        setFilerValue,
        addTask
    }: TodolistItemPropsType) => {

    const [inputValue, setInputValue] = useState('');
    const addTaskHandler = () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return
        addTask(trimmedInput)
        setInputValue('');
    }
    const onEnterAddTaskHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <input
                type="text"
                placeholder={"new task"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e:KeyboardEvent<HTMLInputElement>) => onEnterAddTaskHandler(e)}
            />
            <CustomButton onClick={addTaskHandler} title={'+'}/>
            <div>
                <CustomButton size="default" title={'All'} onClick={() => setFilerValue('all')}/>
                <CustomButton title={'Active'} onClick={() => setFilerValue('active')}/>
                <CustomButton title={'Completed'} onClick={() => setFilerValue('completed')}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id || crypto.randomUUID()}>
                                <TaskItem
                                    task={task}
                                    removeTask={removeTask}
                                    toggleTask={toggleTask}
                                />
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
