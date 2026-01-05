import {AddTodolistDialog} from '@/feature/todolists/ui/Todolists/Todolist/AddTodolistDialog'
import {ToDoListType} from '@/types/types'

type EmptyTodolistsStateProps = {
    onAddTodolist: (title: ToDoListType['title']) => void
}

export const EmptyTodolistsState = ({ onAddTodolist }: EmptyTodolistsStateProps) => {
    return (
        <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">Нет списков задач</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Создайте свой первый список задач
                </p>
                <AddTodolistDialog onAddTodolist={onAddTodolist} />
            </div>
        </div>
    )
}
