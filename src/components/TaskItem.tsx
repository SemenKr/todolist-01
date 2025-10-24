import {CustomButton} from './CustomButton.tsx';
import {TaskItemType} from '../types/types.ts';
import {ChangeEvent} from 'react';

export function TaskItem({
                             task,
                             removeTask,
                             toggleTask
                         }: TaskItemType) {

    const removeTaskHandler = () => {
        removeTask?.(task.id)
    }

    const toggleTaskHandler = (e:ChangeEvent<HTMLInputElement>) => {
        toggleTask?.(task.id, e.currentTarget.checked)
    }

    return (
        <div className="flex items-center justify-between gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group touch-manipulation">
            <div className="flex items-center gap-3 flex-1 min-w-0"> {/* Добавлен min-w-0 для правильного обрезания текста */}
                {/* Кастомный контейнер для чекбокса */}
                <div className="relative flex items-center flex-shrink-0">
                    <input
                        id={task.id}
                        checked={task.isDone}
                        type="checkbox"
                        onChange={toggleTaskHandler}
                        className="peer sr-only"
                    />
                    {/* Кастомный чекбокс */}
                    <div className={`
                        w-5 h-5 sm:w-6 sm:h-6 border-2 rounded flex items-center justify-center
                        transition-all duration-200 ease-in-out
                        peer-checked:bg-blue-500 peer-checked:border-blue-500
                        peer-checked:text-white peer-focus:ring-2 peer-focus:ring-blue-200
                        active:scale-95
                        ${task.isDone
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 text-transparent hover:border-blue-400'
                    }
                    `}>
                        <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                <label
                    htmlFor={task.id}
                    className={`
                        text-sm sm:text-base font-medium cursor-pointer transition-colors w-full
                        break-words overflow-hidden text-ellipsis line-clamp-2
                        ${task.isDone
                        ? 'line-through text-gray-400'
                        : 'text-gray-900 hover:text-gray-700'
                    }
                    `}
                >
                    {task.title}
                </label>
            </div>

            <CustomButton
                variant="outline"
                title="×"
                onClick={removeTaskHandler}
                className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center hover:bg-red-500 hover:text-white border border-gray-300 text-gray-500 transition-all duration-200 text-xs sm:text-sm font-bold active:scale-95"
                aria-label={`Удалить задачу "${task.title}"`}
            />
        </div>
    )
}
