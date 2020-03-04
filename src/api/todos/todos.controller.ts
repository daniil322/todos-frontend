import { Request, Response } from "express";
import newRedis from '../../server'
import todosService from "./todos.service";


async function getTodos(req: Request, res: Response) {
    try {
        const cachedTodos = await newRedis.getCache()
        if (cachedTodos) {
            return res.send(cachedTodos)
        }
        const todos = await todosService.get()
        newRedis.setCache(todos)
        res.send(todos)
    } catch (err) {
        console.log(err)
    }
}

async function removeTodo(req: Request, res: Response) {
    const { _id } = req.query
    try {
        newRedis.remove(_id)
        await todosService.remove(_id)
        res.end()
    } catch (err) {
        console.log(err)
    }
}

async function updateTodo(req: Request, res: Response) {
    const newTodo = req.body
    try {
        const todos = await todosService.update(newTodo)
        newRedis.update(newTodo)
        res.send(todos)
    } catch (err) {
        console.log(err)
    }
}

async function addTodo(req: Request, res: Response) {
    const todo = req.body
    try {
        await todosService.add(todo)
        newRedis.add(todo)
        res.send(todo)
    } catch (err) {
        console.log(err)
    }
}

export default { getTodos, removeTodo, updateTodo, addTodo }