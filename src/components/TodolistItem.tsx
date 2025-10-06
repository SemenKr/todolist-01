import {Button} from './Button.tsx';
import {TaskItem} from './TaskItem.tsx';
import {TodolistItemPropsType} from '../types/types.ts';


export const TodolistItem = ({
                                 title,
                                 tasks = [],
                                 date,
                                 removeTask,
                                 toggleTask,
                                 setFilerValue
                             }: TodolistItemPropsType) => {

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

            <div>{date}</div>
            <div>
                <Button title={'All'} callBack={() => setFilerValue('all')}/>
                <Button title={'Active'} callBack={() => setFilerValue('active')}/>
                <Button title={'Completed'} callBack={() => setFilerValue('completed')}/>
            </div>
        </div>
    )
}
