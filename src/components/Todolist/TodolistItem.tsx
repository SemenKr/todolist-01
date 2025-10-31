import { Button } from '@/components/ui'
import { TaskItem } from './TaskItem.tsx';
import { FilterValueType, TodolistItemPropsType } from '../../types/types.ts';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useState, KeyboardEvent } from 'react';
import { FilterButtons } from '@/components/Todolist/FilterButtons.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Plus } from 'lucide-react';
import { Title } from '@/components/ui/title.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area'; // ← правильный импорт

export const TodolistItem = ({
                                 title,
                                 tasks = [],
                                 removeTask,
                                 toggleTask,
                                 setFilerValue,
                                 addTask,
                                 editTask,
                                 filter,
                             }: TodolistItemPropsType) => {

    const [inputValue, setInputValue] = useState('');

    const addTaskHandler = () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) {
            toast.error('Введите текст задачи');
            return;
        }
        addTask(trimmedInput);
        setInputValue('');
        toast.success('Задача добавлена! 🎉');
    }

    const onEnterAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const handleFilterChange = (value: FilterValueType) => {
        setFilerValue(value);
        toast.info(`Фильтр изменен на: ${value === 'all' ? 'Все' : value === 'active' ? 'Активные' : 'Выполненные'}`);
    }

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center justify-between align-middle w-full sm:w-auto">
                    <Title level={3} className="!m-0">{title}</Title>
                    <Badge variant="secondary" className="sm:hidden">{tasks.length}</Badge>
                </div>
                <Badge variant="secondary" className="hidden sm:inline-flex">{tasks.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-6"> {/* ← добавляем отступы между секциями */}
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                        placeholder="Добавьте новую задачу..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={onEnterAddTaskHandler}
                        className="flex-1"
                    />
                    <Button
                        onClick={addTaskHandler}
                        disabled={!inputValue.trim()}
                        className="sm:px-4 px-3 py-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span className="sr-only">Добавить задачу</span>
                    </Button>
                </div>

                <div>
                    <FilterButtons
                        currentFilter={filter}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                {tasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <p>Задач пока нет</p>
                        <p className="text-sm mt-1">Добавьте первую задачу выше</p>
                    </div>
                ) : (
                    <ScrollArea className="h-[400px] pr-4 rounded-md">
                        <div className="p-1 space-y-2">
                            {tasks.map(task => (
                                <div
                                    key={task.id}
                                    className="rounded-lg border border-gray-200 dark:border-gray-600" // ← добавляем border вместо фона
                                >
                                    <TaskItem
                                        task={task}
                                        removeTask={removeTask}
                                        toggleTask={toggleTask}
                                        onEditTask={editTask}
                                    />
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </CardContent>
        </Card>
    );
};
