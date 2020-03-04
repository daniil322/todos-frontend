import React, { useState } from 'react'
import { Checkbox } from 'antd';

import TodoItem from '../store/TodoItem';
import { useStore } from '../store/UseStore';
import TodoForm from './TodoForm';
import editImg from '../assets/img/edit.png'
import removeImg from '../assets/img/remove.png'


interface Props {
    todo: TodoItem
}

export default function TodoPreview({ todo: { title, isDone, toggleTodo, _id, updateText } }: Props) {
    const rootStore = useStore();
    const { todosList } = rootStore
    const [editMode, setEditMode] = useState(false)

    function removeTodo() {
        todosList.removeTodo(_id)
    }

    function editTodo(text: string) {
        updateText(text)
        setEditMode(false)
    }

    if (editMode) {
        return <TodoForm todoTitle={title} isEdit={editMode} onUpdateTodo={editTodo} />
    }
    return (
        <div className={'flex todo-container space-between align-center'}>
            <div className='flex'>
                <Checkbox checked={isDone} onChange={toggleTodo} className='todo-checkbox' />
                <div className={isDone ? 'line-through' : ''}>{title}</div>
            </div>
            <div className='flex'>
                <img src={editImg} alt='Edit' className='btn pointer' onClick={() => setEditMode(true)}/>
                <img src={removeImg} className='pointer' alt='remove' onClick={removeTodo} />
            </div>
        </div>
    )
}