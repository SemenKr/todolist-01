import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
    // Получаем значение из localStorage или используем initialValue
    const [storedValue, setStoredValue] = useState<T>(() => {
        // Проверяем, что мы в браузере (а не на сервере)
        if (typeof window === 'undefined') {
            return initialValue
        }

        try {
            // Пытаемся получить данные из localStorage
            const item = window.localStorage.getItem(key)
            // Если данные есть - парсим их, иначе используем initialValue
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            // Если произошла ошибка - используем initialValue
            console.log(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    // Обновляем localStorage при изменении значения
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Определяем какое значение сохранять
            const valueToStore = value instanceof Function ? value(storedValue) : value
            // Обновляем состояние React
            setStoredValue(valueToStore)
            // Сохраняем в localStorage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore))
            }
        } catch (error) {
            console.log(`Error setting localStorage key "${key}":`, error)
        }
    }

    return [storedValue, setValue] as const
}
