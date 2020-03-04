import React from 'react'
import { useStore } from '../store/UseStore';
import { useObserver } from 'mobx-react-lite'
import { Progress } from 'antd';

import TodoList from '../components/TodoList'


export default function TodosPage() {
    const rootStore = useStore();
    const { todosList } = rootStore

    function addTodo(title: string) {
        todosList.addTodo(title)
    }

    return useObserver(() => {
        return <div className='app-container flex coulmn justify-center'>
            <h3 className='text-center title'>Global Todos</h3>
            <Progress percent={todosList.todosPrecent()} />
            <TodoList onUpdateTodo={addTodo} />
            <div className='flex coulmn'>
            </div>
        </div>
    }
    )

}