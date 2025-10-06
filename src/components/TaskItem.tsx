import {Button} from './Button.tsx';
import {TaskItemType} from '../types/types.ts';



export function TaskItem({task, removeTask, toggleTask}: TaskItemType) {

    return (
        <label>
            <input type="checkbox" checked={task.isDone}
                   onChange={() => toggleTask?.(task.id)}/>
            <span>{task.title}</span>
            <Button title={'-'} callBack={() => removeTask?.(task.id)}/>
            <span>{task.id}</span>
        </label>
    )
}
