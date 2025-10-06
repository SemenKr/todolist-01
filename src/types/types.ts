export type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    removeTask: (id: number) => void
    toggleTask: (id: number) => void
    setFilerValue: (value: FilterValueType) => void
}
export type TaskItemType = {
    task: TaskType
    removeTask: (id: number) => void
    toggleTask: (id: number) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'completed' | 'active'
