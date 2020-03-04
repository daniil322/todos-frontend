import React, { useEffect } from 'react'
import TodoPreview from "./TodoPreview";
import TodoItem from '../store/TodoItem';
import { useObserver } from 'mobx-react-lite'
import { useStore } from '../store/UseStore';
import TodoForm from './TodoForm';

interface Props {
    onUpdateTodo: Function
}

export default function TodoList({ onUpdateTodo }: Props) {
    const rootStore = useStore();
    const { todosList } = rootStore

    useEffect(() => {
        todosList.getTodos()
    }, [todosList])

    return useObserver(() => (
        <div className='container'>
            <h3>Todos</h3>
            {todosList.unfinishedTodos.map((todo: TodoItem) => {
                return <TodoPreview key={todo.title + todo._id} todo={todo} />
            })}
            <TodoForm onUpdateTodo={onUpdateTodo} />
            <h3>Finished Todos</h3>
            {todosList.finishedTodos.map((todo: TodoItem) => {
                return <TodoPreview key={todo.title + todo._id} todo={todo} />
            })}
        </div>
    ))

}