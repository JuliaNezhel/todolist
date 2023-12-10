import { combineReducers, createStore } from "redux";
import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolist-reducer';

const rootReduser = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
})


export type RootReduserType = ReturnType<typeof rootReduser>
export const store = createStore(rootReduser)