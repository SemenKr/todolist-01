export type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    toggleTask: (id: string) => void
    setFilerValue: (value: FilterValueType) => void
    addTask: (taskTitle: string) => void
}
export type TaskItemType = {
    task: TaskType
    removeTask: (id: string) => void
    toggleTask: (id: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'completed' | 'active'
