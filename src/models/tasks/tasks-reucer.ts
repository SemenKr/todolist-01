import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';
import {TasksListType} from '@/types/types.ts';
import {createTodolistAC, deleteTodolistAC} from '@/models/todolists/todolists-reducer.ts';

const initialState: TasksListType = {}

export const deleteTaskAC = createAction<{
    todolistId: string,
    taskId: string
}>('tasks/deleteTask')
export const createTaskAC = createAction<{
    todolistId: string,
    title: string
}>('tasks/createTask')
export const changeTaskStatusAC = createAction<{
    todolistId: string,
    taskId: string,
    isDone: boolean
}>('changeTaskStatus')
export const changeTaskTitleAC = createAction<{
    todolistId: string,
    taskId: string,
    title: string
}>('tasks/changeTaskTitle')
export const clearTaskAC = createAction<{
    todolistId: string
}>('tasks/clearTask')

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTaskAC, (state, action) => {
            state[action.payload.todolistId] = state[action.payload.todolistId].filter(
                task => task.id !== action.payload.taskId
            )
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].push({id: nanoid(), title: action.payload.title, isDone: false})
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const taskToUpdate = tasks.find(task => task.id === action.payload.taskId);
            if (taskToUpdate) {
                taskToUpdate.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const taskToUpdate = tasks.find(task => task.id === action.payload.taskId);
            if (taskToUpdate) {
                taskToUpdate.title = action.payload.title
            }
        }).addCase(clearTaskAC, (state, action) => {
            state[action.payload.todolistId] = []
    })
})
