import {Button} from '@/components/ui';
import {TaskItemType} from '../../types/types.ts';
import {Checkbox} from '@/components/ui/checkbox';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Input} from '@/components/ui/input';
import {useState} from 'react';
import {toast} from 'sonner';

export function TaskItem({
                             todolistId,
                             task,
                             removeTask,
                             toggleTask,
                             onEditTask
                         }: TaskItemType) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);

    const handleEditSave = () => {
        if (editValue.trim() && editValue !== task.title) {
            onEditTask?.(task.id, editValue.trim(), todolistId);
            toast.success('Задача обновлена! ✏️');
        }
        setIsEditing(false);
    }

    const handleEditCancel = () => {
        setEditValue(task.title);
        setIsEditing(false);
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleEditSave();
        } else if (e.key === 'Escape') {
            handleEditCancel();
        }
    }

    const removeTaskHandler = () => {
        removeTask?.(task.id, todolistId);
        toast.error(`Задача "${task.title}" удалена 🗑️`);
    }

    const toggleTaskHandler = (checked: boolean) => {
        if (task.isDone !== checked) {
            toggleTask?.(task.id, checked, todolistId);

            if (checked) {
                toast.success(`Задача "${task.title}" выполнена! ✅`, {
                    description: 'Отличная работа!',
                });
            } else {
                toast.info(`Задача "${task.title}" возвращена в активные ↩️`);
            }
        }
    }

    return (
        <div
            className="flex items-center justify-between gap-3 p-4 rounded-lg group transition-colors hover:bg-gray-50 dark:hover:bg-gray-600">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <Checkbox
                    checked={task.isDone}
                    onCheckedChange={(checked) => toggleTaskHandler(checked as boolean)}
                    className="h-5 w-5"
                />

                <Popover open={isEditing} onOpenChange={setIsEditing}>
                    <PopoverTrigger asChild>
                        <span
                            className={`
                                text-base font-medium w-full break-words cursor-pointer
                                rounded px-2 py-1 transition-colors
                                ${task.isDone
                                ? 'line-through text-gray-400'
                                : 'text-gray-900 dark:text-gray-100'
                            }
                            `}
                        >
                            {task.title}
                        </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4">
                        <div className="space-y-4">
                            <h4 className="font-medium">Редактировать задачу</h4>
                            <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Введите новое название..."
                                autoFocus
                            />
                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="outline"
                                    onClick={handleEditCancel}
                                    className="text-sm"
                                    title={'Отмена'}
                                />
                                <Button
                                    onClick={handleEditSave}
                                    className="text-sm"
                                    title={'Сохранить'}
                                />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <Button
                variant="outline"
                title="×"
                onClick={removeTaskHandler}
                className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded hover:bg-red-500 hover:text-white transition-all"
                aria-label={`Удалить задачу "${task.title}"`}
            />
        </div>
    )
}
