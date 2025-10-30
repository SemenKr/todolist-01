export type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    toggleTask: (id: string, isDone: boolean) => void
    setFilerValue: (value: FilterValueType) => void
    addTask: (taskTitle: string) => void
    editTask?: (id: string, newTitle: string) => void
    filter: FilterValueType
}
export type TaskItemType = {
    task: TaskType
    removeTask: (id: string) => void
    toggleTask: (id: string, isDone: boolean) => void
    onEditTask?: (id: string, newTitle: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'completed' | 'active'

export type FilterButtonsProps = {
    currentFilter: FilterValueType
    onFilterChange: (filter: FilterValueType) => void
}
