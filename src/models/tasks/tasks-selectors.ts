import {RootState} from '@/app/store.ts';
import {TasksListType} from '@/types/types.ts';

export const selectTasks = (state: RootState): TasksListType => state.tasks
