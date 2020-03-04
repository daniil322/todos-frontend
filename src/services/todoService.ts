import Axios from 'axios'
import TodoItem from '../store/TodoItem';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/todos'
    : '//localhost:3030/api/todos'


let axios = Axios.create({
    withCredentials: true
});


async function get() {
    const todos = await axios.get(BASE_URL)
    return todos.data
}

async function add(todo: TodoItem) {
    const todos = await axios.post(BASE_URL, todo)
    return todos.data
}

async function update(todo: TodoItem) {
    const todos = await axios.put(BASE_URL, todo)
    return todos.data
}

async function remove(todoId: number) {
    const todo = await axios.delete(`${BASE_URL}?_id=${todoId}`)
    return todo.data
}


export default {
    get,
    add,
    remove,
    update
}