import { RootStore } from './RootStore'

import { observable, action, computed } from "mobx"
import todoService from '../services/todoService'
import TodoItem from './TodoItem'



export default class TodoList {

    @observable.shallow todos: TodoItem[] = []
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @action
    addTodo = async (title: string) => {
        const todo = new TodoItem(title)
        try {
            this.todos.push(todo)
            const newTodo = await todoService.add(todo)
            todo.setId(newTodo._id)
        }
        catch (err) {
            const index = this.todos.indexOf(todo)
            this.todos.splice(index, 1)
        }
    }

    @action
    removeTodo = async (_id: number) => {
        await todoService.remove(_id)
        this.todos = this.todos.filter((todo) => {
            return todo._id !== _id
        })
    }

    @action
    getTodos = async () => {
        const todos: TodoItem[] = await todoService.get()
        todos.forEach(todo => {
            this.todos.push(new TodoItem(todo.title, todo.isDone, todo._id))
        });
    }

    @computed
    get finishedTodos(): TodoItem[] {
        return this.todos.filter(todo => todo.isDone);
    }

    @computed
    get unfinishedTodos(): TodoItem[] {
        return this.todos.filter(todo => !todo.isDone);
    }


    todosPrecent(): number {
        if (this.todos.length === 0) return 0
        const doneTodos = this.todos.reduce((acc, todo) => {
            if (todo.isDone) {
                return acc += 1
            } else return acc
        }, 0)
        return Math.floor((doneTodos / this.todos.length) * 100)
    }

}



