import { Button} from '../Button.tsx';
import {TaskItem} from './TaskItem.tsx';
import {FilterValueType, TodolistItemPropsType} from '../../types/types.ts';
import {useState, KeyboardEvent} from 'react';


export const TodolistItem = (
    {
        title,
        tasks = [],
        removeTask,
        toggleTask,
        setFilerValue,
        addTask,
        editTask,
    }: TodolistItemPropsType) => {
// const
    const [inputValue, setInputValue] = useState('');
// fn
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
    const setFilerValueHandler = (value: FilterValueType) => {
        setFilerValue(value)
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Добавьте новую задачу..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onEnterAddTaskHandler(e)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Button
                    onClick={addTaskHandler}
                    title={'+'}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-bold text-lg"
                />
            </div>

            <div className="flex gap-2 mb-6">
                <Button
                    size="default"
                    title={'All'}
                    onClick={() => setFilerValueHandler('all')}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                />
                <Button
                    title={'Active'}
                    onClick={() => setFilerValueHandler('active')}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                />
                <Button
                    title={'Completed'}
                    onClick={() => setFilerValueHandler('completed')}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                />
            </div>

            {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>Задач пока нет</p>
                    <p className="text-sm mt-1">Добавьте первую задачу выше</p>
                </div>
            ) : (
                <ul className="space-y-2">
                    {tasks.map(task => (
                        <li key={task.id || crypto.randomUUID()} className="bg-gray-50 rounded-lg">
                            <TaskItem
                                task={task}
                                removeTask={removeTask}
                                toggleTask={toggleTask}
                                onEditTask={editTask}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
