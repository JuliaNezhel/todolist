import { v1 } from 'uuid';
import { TasksStateType, TodolistType } from '../App';
import { AddTodolistType, RemoveTodolistType, todolistId1, todolistId2 } from './todolist-reducer';

const initialState : TasksStateType = {
    [todolistId1]: [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true }
    ],
    [todolistId2]: [
        { id: v1(), title: "Milk", isDone: true },
        { id: v1(), title: "React Book", isDone: true }
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReduceType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id != action.payload.taskId) }
        }
        case 'ADD-TASK': {
            const newTask = { id: v1(), title: action.payload.title, isDone: false }
            return {
                ...state, [action.payload.todolistId]:
                    [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATYS': {
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID].map(t => t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID].map(t => t.id === action.payload.taskId ? { ...t, title: action.payload.newTitle } : t)
            }
        }
        case 'ADD-TODOLIST': {
            const stateCopy =  {...state}
            stateCopy[action.todolistId] = []
            return {...state, [action.todolistId] : []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy =  {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
            // const {[action.payload.id]: [], ...rest} = state
            // return rest
        }
        default: return state
    }

}


type TasksReduceType = RemoveTaskType | AddTaskType | ChangeTaskStatusType | ChangeTaskTitleType | AddTodolistType | RemoveTodolistType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId
        }
    } as const
}

type AddTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATYS',
        payload: {
            taskId,
            todolistID,
            isDone
        }
    } as const
}

type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskId: string, newTitle: string,) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistID,
            taskId,
            newTitle
        }
    } as const
}

