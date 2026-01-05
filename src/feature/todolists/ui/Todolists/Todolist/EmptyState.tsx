// src/components/Todolist/EmptyState.tsx
export const EmptyState = () => {
    return (
        <div className="text-center py-12 px-6">
            {/* Красивая SVG иконка */}
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-full h-full"
                >
                    <path
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Список пуст
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                Начните добавлять задачи, чтобы увидеть их здесь. Каждая маленькая цель - это шаг к большому успеху!
            </p>

            <div className="text-xs text-gray-400 dark:text-gray-500 mt-8">
                ✨ Добавьте свою первую задачу выше
            </div>
        </div>
    )
}
