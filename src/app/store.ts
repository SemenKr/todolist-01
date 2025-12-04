// app/store.ts - правильная версия
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todolistsReducer } from '@/models/todolists/todolists-reducer';
import { tasksReducer } from '@/models/tasks/tasks-reucer';

const STORAGE_KEY = 'todoapp';

// Комбинируем редюсеры
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

// Типы
export type RootState = ReturnType<typeof rootReducer>;

// Загрузка из localStorage
const loadState = (): RootState | undefined => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return undefined;
        return JSON.parse(saved);
    } catch {
        return undefined;
    }
};

// Создание store
export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
});

// Автосохранение
let timeout: NodeJS.Timeout;
store.subscribe(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
        } catch (error) {
            console.error('Failed to save state:', error);
        }
    }, 300);
});

export type AppDispatch = typeof store.dispatch;

// Функция для очистки
export const clearAppData = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
};
