import {todolistsApi} from '@/feature/todolists/api/todolistsApi';
import type {Todolist} from '@/feature/todolists/api/todolistsApi.types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    selectors: {
        selectTodolists: (state) => state,
        selectTodolistById: (state, id: string) =>
            state.find(tl => tl.id === id),
    },
    reducers: (create) => ({
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),

    }),
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
                const todolists: DomainTodolist[] = action.payload.map((tl) => {
                    return { ...tl, filter: 'all'}
                })
                return todolists
            })
            .addCase(fetchTodolistsTC.rejected, (_state, action: any) => {
                alert(action.payload.message)
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state.push({
                    ...action.payload,
                    filter: 'all',
                })
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })

    }
})

// Thunk
export const fetchTodolistsTC = createAsyncThunk(
    `${todolistsSlice.name}/fetchTodolistsThunk`,
    async (_arg, { rejectWithValue }) => {
        try {
            const res = await todolistsApi.getTodolists()
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    },
)

export const changeTodolistTitleTC = createAsyncThunk(
    `${todolistsSlice.name}/changeTodolistTitleTC`,
    async (args: { id: string; title: string }, { rejectWithValue }) => {
        try {
            await todolistsApi.changeTodolistTitle(args)
            return args
        } catch (err) {
            return rejectWithValue(err)
        }
    },
)

export const createTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/createTodolistTC`,
    async (title: string, { rejectWithValue }) => {
        try {
            const res = await todolistsApi.createTodolist(title)
            return res.data.data.item   // ❗ реальный todolist с сервера
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const deleteTodolistTC = createAsyncThunk(
    'todolists/deleteTodolistTC',
    async (id: string, { rejectWithValue }) => {
        try {
            await todolistsApi.deleteTodolist(id)
            return { id }
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const { changeTodolistFilterAC } = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
export const {
    selectTodolists,
    selectTodolistById,
} = todolistsSlice.selectors
export type DomainTodolist = Todolist & { filter: FilterValues }

export type FilterValues = "all" | "active" | "completed"
