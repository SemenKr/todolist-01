import { RootState } from './store';

const STORAGE_KEY = 'todoapp_state';

// Загрузка состояния из localStorage
export const loadState = (): Partial<RootState> | undefined => {
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading state from localStorage:', err);
        return undefined;
    }
};

// Сохранение состояния в localStorage
export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (err) {
        console.error('Error saving state to localStorage:', err);
    }
};

// Очистка localStorage
export const clearStorage = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
        console.error('Error clearing localStorage:', err);
    }
};
