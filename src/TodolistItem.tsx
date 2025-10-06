import {FilterValueType, TaskType} from './App'
import {Button} from './components/Button.tsx';

type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    removeTask: (id: number) => void
    toggleTask: (id: number) => void
    setFilerValue: (value: FilterValueType) => void
}
export const TodolistItem = (props: TodolistItemPropsType) => {
    const {
        title,
        tasks = [],
        date,
        removeTask,
        toggleTask,
        setFilerValue
    } = props
    return (
        <div>
            <h3>{title}</h3>
            <input type="text"/>
            <Button title={'+'}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id || crypto.randomUUID()}>
                                <label>
                                    <input type="checkbox" checked={task.isDone}
                                           onChange={() => toggleTask?.(task.id)}/>
                                    <span>{task.title}</span>
                                    <Button title={'-'} callBack={() => removeTask?.(task.id)}/>
                                    <span>{task.id}</span>
                                </label>

                            </li>
                        )
                    })}
                </ul>
            )}

            <div>{date}</div>
            <div>
                <Button title={'All'} callBack={() => setFilerValue('all')}/>
                <Button title={'Active'} callBack={() => setFilerValue('active')}/>
                <Button title={'Completed'} callBack={() => setFilerValue('completed')}/>
            </div>
        </div>
    )
}
