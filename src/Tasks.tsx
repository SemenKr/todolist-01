import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {fetchTasksTC, selectTasksByTodolistId} from '@/feature/todolists/model/tasks-slice';
import {EmptyState} from '@/feature/todolists/ui/Todolists/Todolist/EmptyState.tsx';
import {TaskItem} from '@/TaskItem.tsx';
import {FilterValueType} from '@/types/types.ts';
import {useEffect, useMemo} from 'react';

type TasksPropsType = {
    todolistId: string;
    filter: FilterValueType;
};

export const Tasks = ({todolistId, filter}: TasksPropsType) => {
    // Получаем только задачи конкретного тудулиста
    const tasks = useAppSelector(state => selectTasksByTodolistId(state, todolistId));
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(todolistId))
    }, [dispatch, todolistId])


    // Мемоизированная фильтрация задач
    const filteredTasks = useMemo(() => {
        if (!tasks) return [];

        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            case 'all':
            default:
                return tasks;
        }
    }, [tasks, filter]);

    if (!tasks || tasks.length === 0) {
        return <EmptyState/>;
    }

    return (
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            <div className="p-1 space-y-2">
                {filteredTasks.map(task => (
                    <div
                        key={task.id}
                        className="rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                        <TaskItem
                            todolistId={todolistId}
                            task={task}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
