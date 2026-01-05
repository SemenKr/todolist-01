import type { RootState } from '@/app/store'
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { tasksApi } from '@/feature/todolists/api/tasksApi'
import type { DomainTask, UpdateTaskModel } from '@/feature/todolists/api/tasksApi.types'
import { createTodolistTC } from '@/feature/todolists/model/todolists-slice'
import { TasksListType } from '@/types/types'

/**
 * State shape:
 * {
 *   [todolistId]: DomainTask[]
 * }
 *
 * ВАЖНО:
 * - Redux хранит Domain-модель (как приходит с сервера)
 * - UI ничего не «додумывает» (нет isDone, только completed)
 */
const initialState: TasksListType = {}

/**
 * Базовый селектор slice.
 * Нужен как вход для memo-селекторов.
 */
export const selectTasksState = (state: RootState): TasksListType =>
    state.tasks

/**
 * МЕМОИЗИРОВАННЫЙ селектор задач конкретного todolist.
 *
 * Почему createSelector:
 * - параметрический селектор (зависит от todolistId)
 * - возвращает массив
 * - без мемоизации создавал бы новую ссылку (warning + лишние ререндеры)
 *
 * Теперь:
 * - при тех же state + todolistId возвращается та же ссылка
 * - warning "Selector returned a different result" исчезает
 */
const selectTasksByTodolistId = createSelector(
    [
        selectTasksState,
        (_: RootState, todolistId: string) => todolistId,
    ],
    (tasks, todolistId): DomainTask[] => {
        // ?? [] безопасен, потому что результат мемоизирован
        return tasks[todolistId] ?? []
    }
)

/* ======================= THUNKS ======================= */

/**
 * Загрузка задач конкретного todolist с сервера
 */
export const fetchTasksTC = createAsyncThunk(
    'tasks/fetchTasksTC',
    async (todolistId: string, { rejectWithValue }) => {
        try {
            const res = await tasksApi.getTasks(todolistId)
            return { todolistId, tasks: res.data.items }
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

/**
 * Создание задачи на сервере
 */
export const createTaskTC = createAsyncThunk(
    'tasks/createTaskTC',
    async (
        payload: { todolistId: string; title: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await tasksApi.createTask(payload)
            return { todolistId: payload.todolistId, task: res.data.data.item }
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

/**
 * Обновление задачи (server-driven: отправляем полную модель)
 */
export const updateTaskTC = createAsyncThunk(
    'tasks/updateTaskTC',
    async (
        payload: { todolistId: string; taskId: string; model: UpdateTaskModel },
        { rejectWithValue }
    ) => {
        try {
            const res = await tasksApi.updateTask(payload)
            return { todolistId: payload.todolistId, task: res.data.data.item }
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

/**
 * Удаление задачи на сервере
 */
export const deleteTaskTC = createAsyncThunk(
    'tasks/deleteTaskTC',
    async (
        payload: { todolistId: string; taskId: string },
        { rejectWithValue }
    ) => {
        try {
            await tasksApi.deleteTask(payload)
            return payload
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

/* ======================= SLICE ======================= */

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,

    /**
     * selectors в slice:
     * - ТОЛЬКО простые селекторы
     * - без параметров
     * - без вычислений и создания новых ссылок
     */
    selectors: {
        selectTasks: state => state,
    },

    reducers: {},

    extraReducers: builder => {
        builder
            /**
             * Инициализация задач todolist после загрузки с сервера
             */
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })

            /**
             * Создание задачи
             * ВАЖНО: гарантируем инициализацию массива,
             * иначе возможен undefined.push
             */
            .addCase(createTaskTC.fulfilled, (state, action) => {
                const { todolistId, task } = action.payload

                if (!state[todolistId]) {
                    state[todolistId] = []
                }

                state[todolistId].push(task)
            })

            /**
             * Обновление задачи
             */
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.task.id)
                if (index !== -1) {
                    tasks[index] = action.payload.task
                }
            })

            /**
             * Удаление задачи
             */
            .addCase(deleteTaskTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] =
                    state[action.payload.todolistId].filter(
                        t => t.id !== action.payload.taskId
                    )
            })

            /**
             * Создание todolist → инициализируем пустой массив задач
             * (важно для корректного добавления задач без fetch)
             */
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.id] = []
            })
    },
})

/**
 * Экспорт простых селекторов из slice
 */
export const { selectTasks } = tasksSlice.selectors

/**
 * Экспорт memo-селекторов
 */
export { selectTasksByTodolistId }

/**
 * Reducer
 */
export const tasksReducer = tasksSlice.reducer
