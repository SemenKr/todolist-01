import {TaskStatus} from '@/common/enums';
import {Button} from '@/common/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/common/components/ui/select';
import {Skeleton} from '@/common/components/ui/skeleton';
import {useGetTasksQuery} from '@/feature/todolists/api/tasksApi';
import type {DomainTodolist} from '@/feature/todolists/libs/types';
import {TaskItem} from '@/feature/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem\'/TaskItem.tsx';
import {useState} from 'react';

type TasksPropsType = {
    todolist: DomainTodolist
}

type TasksPaginationPropsType = {
    totalCount: number
    page: number
    setPage: (page: number) => void
    pageSize: number
    setPageSize: (pageSize: number) => void
}

const skeletonTitleWidths = [
    'w-3/5',
    'w-2/3',
    'w-1/2',
    'w-4/5',
    'w-2/5',
    'w-3/4',
]

const TasksSkeleton = () => {
    return (
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            <div className="p-1 space-y-2">
                {skeletonTitleWidths.map((widthClass, index) => (
                    <div
                        key={index}
                        className="rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                        <div className="flex items-center gap-3 p-3">
                            <Skeleton className="h-4 w-4 rounded-[4px]" />
                            <Skeleton className={`h-4 ${widthClass}`} />
                            <div className="ml-auto flex gap-1">
                                <Skeleton className="h-8 w-8 rounded-md" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const pageSizeOptions = [5, 10, 20, 50]

const TasksPagination = ({
    totalCount,
    page,
    setPage,
    pageSize,
    setPageSize,
}: TasksPaginationPropsType) => {
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
    const canGoBack = page > 1
    const canGoForward = page < totalPages

    const handlePageSizeChange = (value: string) => {
        const nextSize = Number(value)
        if (Number.isNaN(nextSize)) {
            return
        }
        setPageSize(nextSize)
        setPage(1)
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-2">
            <div className="text-sm text-muted-foreground">
                Страница {page} из {totalPages} · Всего {totalCount}
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={!canGoBack}
                    aria-label="Предыдущая страница"
                >
                    Назад
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={!canGoForward}
                    aria-label="Следующая страница"
                >
                    Вперед
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">На странице</span>
                <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
                    <SelectTrigger size="sm">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {pageSizeOptions.map((size) => (
                            <SelectItem key={size} value={String(size)}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export const Tasks = ({todolist}: TasksPropsType) => {
    // Получаем только задачи конкретного тудулиста
    const { id, filter } = todolist

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const { data, isLoading } = useGetTasksQuery({
        todolistId: id,
        params: { page, count: pageSize },
    })
    // Мемоизированная фильтрация задач
    let filteredTasks = data?.items
    if (filter === "active") {
        filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
    }
    if (filter === "completed") {
        filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
    }

    if (isLoading) {
        return <TasksSkeleton />
    }


    return (
        <div className="space-y-2">
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                <div className="p-1 space-y-2">
                    {filteredTasks?.map(task => (
                        <div
                            key={task.id}
                            className="rounded-lg border border-gray-200 dark:border-gray-600"
                        >
                            <TaskItem
                                todolistId={todolist.id}
                                task={task}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {data && data.totalCount > pageSize && (
                <TasksPagination
                    totalCount={data.totalCount}
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            )}
        </div>
    );
};
