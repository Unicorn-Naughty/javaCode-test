import { TTodos } from "@/types/prisma"
import { instance } from "../instance"
import { TPostTodo } from "@/app/api/todos/route"

export const deleteTodo = async (id: number): Promise<TTodos> => {
    const { data } = await instance.delete<TTodos>(`/todos/${id}`)
    return data
}
export const patchTodo = async (id: number, values: TPostTodo): Promise<TTodos> => {
    const { data } = await instance.patch<TTodos>(`/todos/${id}`, values)
    return data
}