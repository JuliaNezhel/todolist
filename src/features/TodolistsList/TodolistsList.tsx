import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { EditableSpan } from "../../components/EditableSpan/EditableSpan";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { FilterValuesType } from "./todolist-reducer";


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
                <Checkbox
                    color="secondary"
                    checked={t.isDone}
                    onChange={onChangeHandler}
                />
                <EditableSpan value={t.title} onChange={updateTaskHandler} />
                <IconButton onClick={onClickHandler} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
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
                <EditableSpan value={props.title} onChange={(newTitle) => props.updateTodo(props.todolistID, newTitle)} />
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={CallDAckHandlerImput} />
            <ul>{tasksList}</ul>
            <div>
                <Button
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    color="secondary"
                    onClick={onClickFilterHeasndler}>
                    All</Button>
                <Button
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    color="success"
                    onClick={onClickFilterHeasndlerActive}>
                    Active</Button>
                <Button
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    color="error"
                    onClick={onClickFilterHeasndlerCompleted}>
                    Completed</Button>
            </div>
        </div>
    );
};
