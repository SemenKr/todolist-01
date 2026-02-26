import {TaskStatus} from '@/common/enums';
import {Button} from '@/common/components/ui/button.tsx';
import {Checkbox} from '@/common/components/ui/checkbox.tsx';
import {Input} from '@/common/components/ui/input.tsx';
import {useRemoveTaskMutation, useUpdateTaskMutation} from '@/feature/todolists/api/tasksApi';
import type {DomainTask} from '@/feature/todolists/api/tasksApi.types';
import {createTaskModel} from '@/feature/todolists/libs/utils';

import {Check, Edit2, Trash2, X} from 'lucide-react';
import {KeyboardEvent, useState} from 'react';
import {toast} from 'sonner';

type TaskItemPropsType = {
    todolistId: string
    task: DomainTask
}


export const TaskItem = ({ todolistId, task }: TaskItemPropsType) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);

    const [updateTask] = useUpdateTaskMutation()
    const [removeTask] = useRemoveTaskMutation()

    const changeTaskStatus = (checked: boolean) => {
        const status = checked ? TaskStatus.Completed : TaskStatus.New
        const model = createTaskModel(task, { status })
        updateTask({ taskId: task.id, todolistId, model })
    }

    const changeTaskTitle = (title: string) => {
        const model = createTaskModel(task, { title })
        updateTask({ taskId: task.id, todolistId, model })
    }

    const isTaskCompleted = task.status === TaskStatus.Completed


    const handleDelete = () => {
        removeTask({ taskId: task.id, todolistId })
        toast.success('Задача удалена')
    }

    const handleEdit = () => {
        setIsEditing(true);
        setEditValue(task.title);
    };

    const handleSave = () => {
        const trimmed = editValue.trim();
        if (!trimmed) {
            toast.error('Название не может быть пустым');
            return;
        }
        if (trimmed === task.title) {
            setIsEditing(false);
            return;
        }

        changeTaskTitle(trimmed);
        setIsEditing(false);
        toast.success('Задача обновлена');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditValue(task.title);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') handleCancel();
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-2 p-3">
                <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="flex-1"
                />
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSave}
                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                    <Check className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleCancel}
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        );
    }

    return (
        <div className="group flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <Checkbox
                checked={isTaskCompleted}
                onCheckedChange={(checked) => changeTaskStatus(checked === true)}
                id={task.id}
            />
            <label
                htmlFor={task.id}
                className={`flex-1 cursor-pointer select-none transition-all ${
                    isTaskCompleted
                        ? 'line-through text-gray-400 dark:text-gray-500'
                        : 'text-gray-900 dark:text-gray-100'
                }`}
            >
                {task.title}
            </label>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleEdit}
                    className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label="Редактировать задачу"
                >
                    <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleDelete}
                    className="h-8 w-8 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                    aria-label="Удалить задачу"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
