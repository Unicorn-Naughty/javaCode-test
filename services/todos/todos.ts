import { TTodos } from "@/types/prisma"
import { instance } from "../instance"
import { TPostTodo } from "@/app/api/todos/route"


export const fetchTodos = async (): Promise<TTodos> => {
    const { data } = await instance.get<TTodos>('/todos')
    return data
}
export const addTodo = async (values: TPostTodo): Promise<TTodos> => {
    const { data } = await instance.post<TTodos>('/todos', values)
    return data
}