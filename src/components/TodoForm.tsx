import React, { useState, KeyboardEvent } from 'react'

import addImg from '../assets/img/add.png'


interface Props {
    onUpdateTodo: Function
    isEdit?: boolean
    todoTitle?:string
}

export default function TodoForm({onUpdateTodo ,todoTitle}: Props) {
    const [title, setTitle] = useState(todoTitle||'')

    function changeInput(ev: React.FormEvent<HTMLInputElement>) {
        setTitle(ev.currentTarget.value)
    }

    function keyPressed(ev: KeyboardEvent) {
        if (ev.key === "Enter") {
            onUpdateTodoClick()
        }
    }
  
    function onUpdateTodoClick() {
        if(!title)return
        onUpdateTodo(title)
        setTitle('')
    }

    return (
        <div className='flex form-container'>
            <input type='text' onKeyDown={keyPressed} className='txt-input' placeholder='Add Todo' value={title} onChange={changeInput} />
            <img src={addImg} alt='add' className='pointer' onClick={onUpdateTodoClick}/>
        </div>
    )

}