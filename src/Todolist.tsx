import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddItemForm } from "./AddItemForm";
import { FilterValuesType } from "./App";
import { EditableSpan } from "./EditableSpan";


export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTasks: (todolistID: string, taskId: string) => void;
    changeFilter: (todoListID: string, newFilteredValue: FilterValuesType) => void;
    addTask: (todolistID: string, title: string) => void;
    changeTaskStatys: (todolistID: string, id: string, isDone: boolean) => void;
    filter: FilterValuesType;
    todolistID: string
    removeTodolist: (todolistID: string) => void
    updateTask: (todolistId: string, isTask: string, title: string) => void
    updateTodo: (todolistID: string, newTitle: string) => void
};

export const Todolist = (props: PodoListPropsType) => {

    const tasksList: Array<JSX.Element> = props.tasks.map((t: TaskType) => {
        const onClickHandler = () => props.removeTasks(props.todolistID, t.id);

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatys(props.todolistID, t.id, e.currentTarget.checked);

        const updateTaskHandler = (title: string) => {
            props.updateTask(props.todolistID, t.id, title)
        }

        return (
            <li key={t.id} className={t.isDone ? "task-is-done" : "task"}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={onChangeHandler}
                />
                <EditableSpan oldTitle={t.title} callBAck={updateTaskHandler} />
                <button onClick={onClickHandler}> x</button>
            </li>
        );
    });

    const onClickFilterHeasndler = () => props.changeFilter(props.todolistID, "all");
    const onClickFilterHeasndlerActive = () => props.changeFilter(props.todolistID, "active");
    const onClickFilterHeasndlerCompleted = () => props.changeFilter(props.todolistID, "completed");


    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const CallDAckHandlerImput = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    return (
        <div>

            <h3>
                <EditableSpan oldTitle={props.title} callBAck={(newTitle) => props.updateTodo(props.todolistID, newTitle)} />
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <AddItemForm callBack={CallDAckHandlerImput} />
            <ul>{tasksList}</ul>
            <div>
                <button className={
                    props.filter === "all" ? "btn-filter-active" : undefined
                }
                    onClick={onClickFilterHeasndler}
                >
                    All
                </button>
                <button
                    className={
                        props.filter === "active"
                            ? "btn-filter-active"
                            : undefined
                    }
                    onClick={onClickFilterHeasndlerActive}
                >
                    Active
                </button>
                <button
                    className={
                        props.filter === "completed"
                            ? "btn-filter-active"
                            : undefined
                    }
                    onClick={onClickFilterHeasndlerCompleted}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};
