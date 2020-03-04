import express from 'express'
import todosController from './todos.controller'

const router = express.Router()

router.get('/', todosController.getTodos)
router.post('/', todosController.addTodo)
router.put('/', todosController.updateTodo)
router.delete('/', todosController.removeTodo)

export default router  