import {CustomButton} from './CustomButton.tsx';
import {TaskItemType} from '../types/types.ts';


export function TaskItem(
    {
        task,
        removeTask,
        toggleTask
    }: TaskItemType) {

    const removeTaskHandler = () => {
        removeTask?.(task.id)
    }

    return (
        <div className="flex items-center justify-between gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3 flex-1">
                <input
                    id={task.id}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                    checked={task.isDone}
                    onChange={() => toggleTask?.(task.id)}
                />
                <label
                    htmlFor={task.id}
                    className={`text-sm font-medium text-gray-900 ${
                        task.isDone ? 'line-through text-gray-500' : ''
                    }`}
                >
                    {task.title}
                </label>
            </div>

            <CustomButton
                variant="outline"
                title="×"
                onClick={removeTaskHandler}
                className="w-6 h-6 rounded flex items-center justify-center hover:bg-red-500 hover:text-white border border-gray-300 text-gray-500 transition-colors text-xs font-bold"
            />
        </div>
    )
}
