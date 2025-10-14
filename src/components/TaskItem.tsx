import {CustomButton} from './CustomButton.tsx';
import {TaskItemType} from '../types/types.ts';


export function TaskItem(
    {
        task,
        removeTask,
        toggleTask
    }: TaskItemType) {

    const removeTaskHandler = (id: string) => {
        removeTask?.(id)
    }

    return (
        <label>
            <CustomButton variant="outline"
                          size="sm"
                          title={'x'}
                          onClick={() => removeTaskHandler?.(task.id)}/>
            <input type="checkbox" checked={task.isDone}
                   onChange={() => toggleTask?.(task.id)}/>
            <span>{task.title}</span>
        </label>
    )
}
