import {CustomButton} from './CustomButton.tsx';
import {TaskItemType} from '../types/types.ts';


export function TaskItem({task, removeTask, toggleTask}: TaskItemType) {

    return (
        <label>
            <CustomButton   variant="outline"
                            size="sm" title={'x'} onClick={() => removeTask?.(task.id)}/>
            <input type="checkbox" checked={task.isDone}
                   onChange={() => toggleTask?.(task.id)}/>
            <span>{task.title}</span>
        </label>
    )
}
