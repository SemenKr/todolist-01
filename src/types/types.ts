export type ToDoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TodolistItemPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: TaskType['id'], todolistId: ToDoListType['id']) => void
    toggleTask: (id: string, isDone: boolean, todolistId: ToDoListType['id']) => void
    changeFilter: (value: FilterValueType, todolistId: ToDoListType['id']) => void
    addTask: (taskTitle: TaskType['title'], todolistId: ToDoListType['id']) => void
    editTask?: (id: string, newTitle: string, todolistId: ToDoListType['id']) => void
    filter: FilterValueType
    clearTasks: (todolistId: ToDoListType['id']) => void
    deleteTodolist: (todolistId: ToDoListType['id']) => void
}
export type TaskItemType = {
    todolistId: ToDoListType['id']
    task: TaskType
    removeTask: (id: TaskType['id'], todolistId: ToDoListType['id']) => void
    toggleTask: (id: TaskType['id'], isDone: TaskType['isDone'], todolistId: ToDoListType['id']) => void
    onEditTask?: (id: TaskType['id'], newTitle: TaskType['title'], todolistId: ToDoListType['id']) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksListType = {
    [todolistId: string]: TaskType[]
}

export type FilterValueType = 'all' | 'completed' | 'active'

export type FilterButtonsProps = {
    currentFilter: FilterValueType
    onFilterChange: (filter: FilterValueType) => void
}
