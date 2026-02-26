import type { RequestStatus } from "@/common/types"
import type {Todolist} from '@/feature/todolists/api/todolistsApi.types';

export type DomainTodolist = Todolist & {
    filter: FilterValues
    entityStatus: RequestStatus
}

export type FilterValues = "all" | "active" | "completed"
