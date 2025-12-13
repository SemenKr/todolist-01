import {RootState} from '@/app/store.ts';
import {ToDoListType} from '@/types/types.ts';

export const selectTodolists = (state: RootState): ToDoListType[] => state.todolists
