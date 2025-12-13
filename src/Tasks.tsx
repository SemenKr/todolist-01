import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { EmptyState } from '@/components/Todolist/EmptyState.tsx';
import { selectTasksByTodolistId } from '@/feature/todolists/model/tasks-selectors.ts';
import { useMemo } from 'react';
import { FilterValueType } from '@/types/types.ts';
import {TaskItem} from '@/TaskItem.tsx';

type TasksPropsType = {
    todolistId: string;
    filter: FilterValueType;
};

export const Tasks = ({ todolistId, filter }: TasksPropsType) => {
    // Получаем только задачи конкретного тудулиста
    const tasks = useAppSelector(state => selectTasksByTodolistId(state, todolistId));

    // Мемоизированная фильтрация задач
    const filteredTasks = useMemo(() => {
        if (!tasks) return [];

        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            case 'all':
            default:
                return tasks;
        }
    }, [tasks, filter]);

    if (!tasks || tasks.length === 0) {
        return <EmptyState />;
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
