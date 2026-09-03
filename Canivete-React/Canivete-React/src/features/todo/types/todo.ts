import type { priority } from "./priority"

export interface Todo {
    id: number
    name: string
    description: string
    time: string
    priority: priority
}