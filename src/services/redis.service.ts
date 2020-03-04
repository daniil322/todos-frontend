import Redis from 'ioredis';
import TodoItem from '../interfaces/TodoItem';

export default class RedisClient {
	private client: Redis.Redis

	constructor(redisPort: string | undefined) {
		this.client = new Redis(redisPort);
	}

	setCache(value: object) {
		this.client.set('todos', JSON.stringify(value))
	}

	connect = () => {
		this.client.on('connect', () => console.log('connected'));
		this.client.on('error', (err: Error) => console.log(err));
	}

	remove = async (_id: number) => {
		let todos = await this.getCache()
		if (todos) {
			todos = todos.filter((todo) => {
				return todo._id !== _id
			})
			return this.setCache(todos)
		}
	}

	add = async (newTodo: TodoItem) => {
		let todos = await this.getCache()
		todos = todos ? [...todos, newTodo] : [newTodo]
		this.setCache(todos)
	}

	update = async (newTodo: TodoItem) => {
		const todos = await this.getCache()
		if (todos) {
			const newtodos = todos.map((todo) => {
				if (newTodo._id === todo._id) {
					return todo = newTodo
				} else {
					return todo
				}
			})
			return this.setCache(newtodos)
		}
	}

	getCache = (): Promise<TodoItem[] | null> => {
		return new Promise((resolve, reject) => {
			this.client.get('todos', (err: Error | null, data: string | null) => {
				if (err) reject(err);
				if (data) {
					return resolve(JSON.parse(data));
				} else {
					return resolve(null);
				}
			})
		})
	}
}


