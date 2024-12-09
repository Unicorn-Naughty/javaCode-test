import React from "react"
import { useStore } from "@/store/todos-store"

export const useTodoStore = () => {
    const state = useStore((state) => state)
    React.useEffect(() => {
        state.fetchTodos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return  state 
}