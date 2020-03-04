import dbService from "../../services/MongoDb.service";
import TodoItem from "../../interfaces/TodoItem";
import newRedis from "../../server";

async function get() {
    const collection = await dbService.getCollection('todos')
    try {
        const todos = await collection.find().toArray();
        return todos
    } catch (err) {
        console.log('ERROR: cannot find todos')
        throw err;
    }
}

async function remove(todoId: string) {
    const collection = await dbService.getCollection('todos')
    try {
        await collection.deleteOne({ _id: +todoId })
        newRedis.remove(+todoId)
    } catch (err) {
        console.log(`ERROR: cannot remove todo ${todoId}`)
        throw err;
    }
}

async function update(todo: TodoItem) {
    const collection = await dbService.getCollection('todos')
    try {
        await collection.replaceOne({ "_id": todo._id }, { $set: todo })
        return todo
    } catch (err) {
        console.log(`ERROR: cannot update game ${todo._id}`)
        throw err;
    }
}

async function add(todo: TodoItem) {
    const collection = await dbService.getCollection('todos')
    try {
        await collection.insertOne(todo);
        return todo;
    } catch (err) {
        console.log(`ERROR: cannot add game`)
        throw err;
    }
}

export default { get, remove, update, add }