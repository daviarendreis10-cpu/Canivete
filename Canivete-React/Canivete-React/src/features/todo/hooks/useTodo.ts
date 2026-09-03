import { useEffect, useState } from "react"
import type { Todo } from "../types/todo"

export default function useTodos ( ) {
    function getLocalStorage () {
            const raw = localStorage.getItem('todos')
    
            if (!raw) return []
    
            const data = JSON.parse(raw) as Todo[]
            return data
        }
    
    const [todos, setTodos] = useState<Todo[]>(() => getLocalStorage())
    

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
    
    return [todos, setTodos] as const
}