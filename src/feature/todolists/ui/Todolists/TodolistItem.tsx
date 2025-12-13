import {Button, CardFooter} from '@/components/ui';
import {FilterValueType, ToDoListType} from '@/types/types.ts';
import {Card, CardContent, CardHeader} from '@/components/ui/card.tsx';
import {FilterButtons} from '@/components/Todolist/FilterButtons.tsx';
import {Trash2} from 'lucide-react';
import {Title} from '@/components/ui/title.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import {toast} from 'sonner';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {changeTodolistFilterAC, deleteTodolistAC} from '@/feature/todolists/model/todolists-reducer.ts';
import {clearTaskAC, createTaskAC} from '@/feature/todolists/model/tasks-reucer.ts';
import {selectTasksByTodolistId} from '@/feature/todolists/model/tasks-selectors.ts';
import {Tasks} from '@/Tasks.tsx';
import {CreateItemForm} from '@/CreateItemForm.tsx';

type TodolistItemPropsType = {
    todolist: ToDoListType;
};

export const TodolistItem = ({ todolist }: TodolistItemPropsType) => {
    const { id, title, filter } = todolist;
    const dispatch = useAppDispatch();

    // Получаем задачи только этого тудулиста
    const tasks = useAppSelector(state => selectTasksByTodolistId(state, id));

    const addTaskHandler = (title: string) => {
        const trimmedInput = title.trim();
        if (!trimmedInput) {
            toast.error('Введите текст задачи');
            return;
        }
        dispatch(createTaskAC({ title: trimmedInput, todolistId: id }));
        toast.success('Задача добавлена! 🎉');
    };


    const handleFilterChange = (value: FilterValueType) => {
        dispatch(changeTodolistFilterAC({ id, filter: value }));
        const filterName = value === 'all' ? 'Все' : value === 'active' ? 'Активные' : 'Выполненные';
        toast.info(`Фильтр изменен на: ${filterName}`);
    };

    const handleClearAll = () => {
        dispatch(clearTaskAC({ todolistId: id }));
        toast.info('Все задачи очищены! 🧹');
    };

    const handleDeleteTodolist = () => {
        dispatch(deleteTodolistAC({ id }));
        toast.success('Список удалён');
    };

    return (
        <Card className="w-full max-w-sm shrink-0 lg:flex-1 lg:max-w-none">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center justify-between align-middle w-full sm:w-auto">
                    <Title level={3} className="m-0!">{title}</Title>
                </div>
                <Badge variant="secondary" className="hidden sm:inline-flex">
                    {tasks.length}
                </Badge>
                <Button
                    variant="ghost"
                    onClick={handleDeleteTodolist}
                    className="rounded-full h-7 w-7 hover:bg-red-500 hover:text-white transition-colors border-0"
                    aria-label="Закрыть"
                >
                    <svg viewBox="-6 -6 24 24">
                        <path fill="currentColor" d="m7.314 5.9 3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"/>
                    </svg>
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">
                <CreateItemForm onAdd={(title)=>addTaskHandler(title)} placeholder={'add Task ...'} />

                <FilterButtons
                    currentFilter={filter}
                    onFilterChange={handleFilterChange}
                />

                <Tasks todolistId={id} filter={filter} />
            </CardContent>

            <CardFooter
                className={`flex justify-start pt-4 pb-4 transition-all duration-500 ${
                    tasks.length > 0 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 pointer-events-none'
                }`}
            >
                <Button
                    variant="outline"
                    onClick={handleClearAll}
                    className="rounded-full border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 group overflow-hidden"
                >
                    <Trash2 className="h-4 w-4 ml-1"/>
                    <span className="max-w-0 group-hover:max-w-20 group-hover:ml-2 transition-all duration-300 overflow-hidden whitespace-nowrap text-sm">
                        Очистить
                    </span>
                    <span className="ml-1 text-xs bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 px-1.5 py-0.5 rounded-full font-medium border border-red-200 dark:border-red-700">
                        {tasks.length}
                    </span>
                </Button>
            </CardFooter>
        </Card>
    );
};
