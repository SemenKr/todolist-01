import {AddTodolistDialog} from '@/components/Todolist/AddTodolistDialog.tsx';
import {useAppSelector} from '@/hooks/useAppSelector.ts';
import {selectTodolists} from '@/models/todolists/todolists-selectors.ts';
import {useAppDispatch} from '@/hooks/useAppDispatch.ts';
import {createTodolistAC} from '@/models/todolists/todolists-reducer.ts';
import {ToDoListType} from '@/types/types.ts';
import {TodolistItem} from '@/components/Todolist/TodolistItem.tsx';

type MainPropsType = {};

export const Main = ({}: MainPropsType) => {
    const todolists = useAppSelector(selectTodolists)
    const dispatch = useAppDispatch()

    // Функция добавления нового тудулиста
    function addTodolist(title: ToDoListType['title']) {
        dispatch(createTodolistAC(title))
    }





    if (!todolists || todolists.length === 0) {
        return (
            <main className="flex-1 p-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                            <div className="max-w-md mx-auto">
                                <h2 className="text-2xl font-bold mb-4">Нет списков задач</h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Создайте свой первый список задач или восстановите демо-данные
                                </p>
                                <AddTodolistDialog onAddTodolist={addTodolist}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 p-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {todolists.map(list => (
                        <TodolistItem
                            key={list.id}
                            todolist={list}
                        />
                    ))}
                    <AddTodolistDialog onAddTodolist={addTodolist}/>
                </div>
            </div>
        </main>
    );
};
