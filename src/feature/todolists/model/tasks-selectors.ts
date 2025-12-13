import { RootState } from '@/app/store.ts';
import { TasksListType, TaskType } from '@/types/types.ts';

// Существующий селектор - возвращает все задачи
export const selectTasks = (state: RootState): TasksListType => state.tasks;

// Новый селектор для получения задач конкретного тудулиста
export const selectTasksByTodolistId = (state: RootState, todolistId: string): TaskType[] => {
    return state.tasks[todolistId] || [];
};
