// app/store.ts — Redux Store (server-driven)

import {todolistsReducer, todolistsSlice} from '@/feature/todolists/model/todolists-slice';
import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from '@/feature/todolists/model/tasks-slice'

// ═══════════════════════════════════════════════════════════════════════════
// СОЗДАНИЕ STORE
// ═══════════════════════════════════════════════════════════════════════════

export const store = configureStore({
    reducer: {
        [todolistsSlice.name]: todolistsReducer,
        tasks: tasksReducer,
    },
})

// ═══════════════════════════════════════════════════════════════════════════
// ТИПЫ
// ═══════════════════════════════════════════════════════════════════════════

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
