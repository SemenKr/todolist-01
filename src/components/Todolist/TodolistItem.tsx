import {Button, CardFooter} from '@/components/ui'
import {TaskItem} from './TaskItem.tsx';
import {FilterValueType, TodolistItemPropsType} from '../../types/types.ts';
import {Card, CardContent, CardHeader} from '@/components/ui/card'
import {KeyboardEvent, useMemo, useState} from 'react';
import {FilterButtons} from '@/components/Todolist/FilterButtons.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Plus, Trash2} from 'lucide-react';
import {Title} from '@/components/ui/title.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import {toast} from 'sonner';
import {EmptyState} from '@/components/Todolist/EmptyState.tsx';

export const TodolistItem = (
    {
        id,
        title,
        tasks,
        removeTask,
        toggleTask,
        changeFilter,
        addTask,
        editTask,
        filter,
        clearTasks
    }: TodolistItemPropsType) => {

    const [inputValue, setInputValue] = useState('');

    // Мемоизированная фильтрация задач - пересчитывается только при изменении tasks или filter
    const filteredTasks = useMemo(() => {
        console.log(`Отфильтрован лист: "${title}", установлен фильтр: ${filter}, всего задач: ${tasks.length}`);
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            case 'all':
            default:
                return tasks;
        }
    }, [tasks, filter, title]); // Зависимости: пересчитываем при изменении tasks или filter

    const addTaskHandler = () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) {
            toast.error('Введите текст задачи');
            return;
        }
        addTask(trimmedInput, id);
        setInputValue('');
        toast.success('Задача добавлена! 🎉');
    }

    const onEnterAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const handleFilterChange = (value: FilterValueType) => {
        changeFilter(value, id);
        toast.info(`Фильтр изменен на: ${value === 'all' ? 'Все' : value === 'active' ? 'Активные' : 'Выполненные'}`);
    }

    const handleClearAll = () => {
        if (clearTasks) {
            clearTasks(id)
            toast.info('Все задачи очищены! 🧹')
        }
    }


    return (
        <Card className="w-full max-w-sm flex-shrink-0 lg:flex-1 lg:max-w-none">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center justify-between align-middle w-full sm:w-auto">
                    <Title level={3} className="!m-0">{title}</Title>
                </div>
                <Badge variant="secondary" className="hidden sm:inline-flex">{filteredTasks.length}</Badge>
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
                        <Plus className="h-5 w-5"/>
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
                    <EmptyState/>
                ) : (
                    <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                        <div className="p-1 space-y-2">
                            {filteredTasks.map(task => (
                                <div
                                    key={task.id}
                                    className="rounded-lg border border-gray-200 dark:border-gray-600" // ← добавляем border вместо фона
                                >
                                    <TaskItem
                                        todolistId={id}
                                        task={task}
                                        removeTask={removeTask}
                                        toggleTask={toggleTask}
                                        onEditTask={editTask}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter
                className={`flex justify-start pt-4 pb-4 transition-all duration-500 ${
                    filteredTasks.length > 0 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 pointer-events-none'}`}>
                <Button
                    variant="outline"
                    onClick={handleClearAll}
                    className="rounded-full border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 group overflow-hidden"
                >

                    <Trash2 className="h-4 w-4 ml-1"/>

                    {/* Текст появляется плавно */}
                    <span
                        className="max-w-0 group-hover:max-w-[80px] group-hover:ml-2 transition-all duration-300 overflow-hidden whitespace-nowrap text-sm">
            Очистить
        </span>

                    <span
                        className="ml-1 text-xs bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 px-1.5 py-0.5 rounded-full font-medium border border-red-200 dark:border-red-700">
            {tasks.length}
        </span>
                </Button>
            </CardFooter>
        </Card>
    );
};
