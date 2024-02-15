import {
  AnyAction,
  combineReducers,
  legacy_createStore,
} from "redux";
import { tasksReducer } from "../features/TodolistsList/tasks-reducer";
import { todolistsReducer } from "../features/TodolistsList/todolist-reducer";
import { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReduser = combineReducers({
  tasks: tasksReducer,
  todolist: todolistsReducer,
});

export type AppRootStateType = ReturnType<typeof rootReduser>;
export const store = legacy_createStore(rootReduser);

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;
