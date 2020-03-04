import { observable, action } from "mobx"
import todoService from "../services/todoService"

export default class TodoItem {
   @observable title: string
   @observable isDone: boolean
   _id: number

   constructor(title: string, isDone: boolean = false, _id = Date.now()) {
      this.title = title
      this.isDone = isDone
      this._id = _id
   }

   @action
   toggleTodo = () => {
      this.isDone = !this.isDone
      todoService.update(this)
   }

   @action
   updateText = (text: string) => {
      this.title = text
      todoService.update(this)
   }

   @action
   setId = (id: number) => {
      this._id = id
   }
}

