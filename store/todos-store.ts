import { TPostTodo } from '@/app/api/todos/route'
import { api } from '@/services/api'
import { TTodos } from '@/types/prisma'
import toast from 'react-hot-toast'
import { create } from 'zustand'

type TTodosStore = {
    items: TTodos
    loading: boolean
    fetchLoading: boolean
    fetchTodos: () => Promise<void>
    addTodo: (values: TPostTodo) => Promise<void>
    deleteTodo: (id: number) => Promise<void>
    patchTodo: (id: number, values: TPostTodo) => Promise<void>
    tagCompleted: (id: number) => void
}

export const useStore = create<TTodosStore>((set) => ({
    items: [],
    loading: false,
    fetchLoading: false,
    fetchTodos: async () => {
        try {
            set({ fetchLoading: true })
            const data = await api.todos.fetchTodos()
            set({ items: data })
        } catch (error) {
            console.log(error);
        } finally {
            set({ fetchLoading: false })
        }
    },
    addTodo: async (values: TPostTodo) => {
        try {
            set({ loading: true })
            const data = await api.todos.addTodo(values)
            set({ items: data })
            toast.success('Задача добавлена!')
        } catch (error) {
            console.log(error);
            toast.error('Ошибка! Задача не добавлена')
        } finally {
            set({ loading: false })
        }
    },
    deleteTodo: async (id: number) => {
        try {
            set({ loading: true })
            const data = await api.todo.deleteTodo(id)
            set({ items: data })
            toast.success('Задача удалена!')
        } catch (error) {
            console.log(error);
            toast.error('Ошибка! Задача не удалена')
        } finally {
            set({ loading: false })
        }
    },
    patchTodo: async (id: number, values: TPostTodo) => {
        try {
            set({ loading: true })
            const data = await api.todo.patchTodo(id, values)
            set({ items: data })
            toast.success('Задача обновлена!')
        } catch (error) {
            console.log(error);
            toast.error('Ошибка! Задача не обновлена')
        } finally {
            set({ loading: false })
        }
    },
    tagCompleted: (id: number) => {
        set(state => ({ items: state.items.map((item) => item.id === id ? { ...item, doneStatus: !item.doneStatus } : item) }))
    }
}))