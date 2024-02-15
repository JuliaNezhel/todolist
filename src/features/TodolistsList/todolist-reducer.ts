import { v1 } from 'uuid';
import {  TodolistType } from '../../App';
import { RequestStatusType } from '../../app/app-reducer';
export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: TodolistsReduceType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(s => s.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistType = { id: action.todolistId, title: action.payload.title, filter: 'all' }
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistID ? { ...el, title: action.payload.newTitle } : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.todolistID ? { ...el, filter: action.payload.newFilter } : el)
        }
        default: return state
    }
}

type TodolistsReduceType = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistfilterType

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>


export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        todolistId: v1(),
        payload: {
            title,

        }
    } as const
}

type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            newTitle,
            todolistID
        }
    } as const
}

type ChangeTodolistfilterType = ReturnType<typeof changeTodolistfilterAC>

export const changeTodolistfilterAC = (todolistID: string, newFilter: FilterValuesType,) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            newFilter,
            todolistID
        }
    } as const
}


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}